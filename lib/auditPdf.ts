import { AuditOffer } from '../types';
import { AuditReport } from '../types';

const escapePdf = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, ' ');

const wrap = (value: string, max = 92) => {
  const words = value.replace(/\s+/g, ' ').trim().split(' ');
  const lines: string[] = [];
  let line = '';
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
};

const textLine = (x: number, y: number, size: number, text: string, color = '0 0 0') =>
  `${color} rg BT /F1 ${size} Tf ${x} ${y} Td (${escapePdf(text)}) Tj ET\n`;

const makePageStream = (lines: string[]) => lines.join('');

const makePdf = (streams: string[]) => {
  const objects: string[] = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids ${streams.map((_, index) => `${4 + index * 2} 0 R`).join(' ')} /Count ${streams.length} >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
  ];

  streams.forEach((stream, index) => {
    const pageObjectId = 4 + index * 2;
    const contentObjectId = pageObjectId + 1;
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectId} 0 R >>`);
    objects.push(`<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}endstream`);
  });

  let body = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(body, 'utf8'));
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(body, 'utf8');
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    body += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(body, 'utf8').toString('base64');
};

export const buildAuditReportPdf = (report: AuditReport, offer: AuditOffer) => {
  const pageLines: string[][] = [[]];
  let y = 748;

  const current = () => pageLines[pageLines.length - 1];
  const addPage = () => {
    pageLines.push([]);
    y = 748;
  };
  const add = (text: string, size = 10, color = '0 0 0', x = 54, lineHeight = 16) => {
    if (y < 62) addPage();
    current().push(textLine(x, y, size, text, color));
    y -= lineHeight;
  };
  const addWrapped = (text: string, size = 10, color = '0 0 0', x = 54, max = 92) => {
    wrap(text, max).forEach((line) => add(line, size, color, x, size + 6));
  };

  add('Qognition', 26, '0 0 0');
  add('AI Growth Marketing Partner', 10, '0 0.55 0.5');
  y -= 12;
  add(`${offer.shortTitle} Report`, 22, '0 0 0');
  add(`Score: ${report.score}/100`, 18, report.score >= 80 ? '0 0.55 0.5' : report.score >= 60 ? '0.85 0.45 0' : '0.75 0 0');
  add(`Audited URL: ${report.normalizedUrl}`, 10, '0.2 0.2 0.2');
  add(`Generated: ${new Date(report.generatedAt).toLocaleString('en-US', { timeZone: 'UTC' })} UTC`, 9, '0.35 0.35 0.35');
  y -= 12;
  add('Executive Summary', 15, '0 0 0');
  addWrapped(report.summary, 10, '0.15 0.15 0.15');
  y -= 8;

  if (report.categoryScores?.length) {
    add('Category Scores', 15, '0 0 0');
    report.categoryScores.forEach((category) => {
      add(`${category.label}: ${category.score}/100`, 11, '0 0.55 0.5');
      addWrapped(category.detail, 9, '0.25 0.25 0.25', 70, 82);
    });
    y -= 8;
  }

  add('Top Recommendations', 15, '0 0 0');
  report.recommendations.forEach((recommendation, index) => {
    addWrapped(`${index + 1}. ${recommendation}`, 10, '0.15 0.15 0.15');
  });

  y -= 8;
  add('Audit Checks', 15, '0 0 0');
  report.checks.forEach((check) => {
    add(`${check.label}: ${check.status.toUpperCase()} (${check.score}/10)`, 10, check.status === 'pass' ? '0 0.55 0.5' : check.status === 'warning' ? '0.85 0.45 0' : '0.75 0 0');
    addWrapped(check.detail, 8.5, '0.25 0.25 0.25', 70, 84);
  });

  addPage();
  add('Next Step', 18, '0 0 0');
  addWrapped('Book a Qognition strategy call to turn this audit into a prioritized growth roadmap with SEO, AI visibility, landing pages, creative, paid media, and CRM follow-up.', 11, '0.15 0.15 0.15');
  y -= 12;
  add('https://calendly.com/hello-qognitionagency/30min', 11, '0 0.55 0.5');
  y -= 30;
  add('Qognition Agency', 16, '0 0 0');
  add('hello@qognitionagency.com | www.qognitionagency.com', 10, '0.25 0.25 0.25');

  return makePdf(pageLines.map(makePageStream));
};
