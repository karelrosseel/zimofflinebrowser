<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<script type="text/babel">
  // "HTMLElement" is the typing of TSX
  const elem: HTMLElement = <div>Hello, World!</div>;
  console.log(elem);
</script>

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

const HTMLEditor = () => {
  const [htmlContent, setHtmlContent] = useState(
`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is a sample HTML page.</p>
</body>
</html>`
  );

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>HTML Editor</span>
            <Button 
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Save as HTML
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Editor */}
            <div className="space-y-2">
              <div className="font-medium">Edit HTML:</div>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="w-full h-96 font-mono text-sm p-4 border rounded-lg"
                spellCheck="false"
              />
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                <Eye size={16} />
                Preview:
              </div>
              <div className="w-full h-96 border rounded-lg overflow-auto">
                <iframe
                  srcDoc={htmlContent}
                  title="preview"
                  className="w-full h-full"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HTMLEditor;
