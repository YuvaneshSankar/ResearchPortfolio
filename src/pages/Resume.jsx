import React from 'react';
import { Helmet } from 'react-helmet';
import { ExternalLink, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RESUME_URL = '/resume.pdf';

const Resume = () => {
  const handleOpenPDF = () => {
    window.open(RESUME_URL, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Resume - Portfolio</title>
        <meta name="description" content="View and download my resume." />
        <meta property="og:title" content="Resume - Portfolio" />
        <meta property="og:description" content="View and download my resume." />
      </Helmet>

      {/* Header with title and action buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Resume
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleOpenPDF}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open PDF
          </Button>
          <Button
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Resume Viewer */}
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        {/* Mac-style window chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border">
          <span className="text-sm text-muted-foreground font-medium">Resume Viewer</span>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
        </div>

        {/* PDF Embed */}
        <div className="w-full bg-neutral-800">
          <iframe
            src={`${RESUME_URL}#toolbar=0&navpanes=0`}
            title="Resume PDF"
            className="w-full border-0"
            style={{ height: 'calc(100vh - 220px)', minHeight: '600px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;
