import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function UploadReportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      // Handle successful upload
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analyze Report
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your medical reports for AI-powered analysis and insights.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload Medical Report
            </CardTitle>
            <CardDescription>
              Upload your medical reports in PDF, JPG, or PNG format for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {file ? file.name : "Choose file or drag and drop"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PDF, JPG, PNG up to 10MB
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="mt-4"
              >
                Select File
              </Button>
            </div>

            {file && (
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFile(null)}
                >
                  Remove
                </Button>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your uploaded reports will be analyzed using AI to provide insights about your health condition. 
                All data is processed securely and confidentially.
              </AlertDescription>
            </Alert>

            <Button
              onClick={handleSubmit}
              disabled={!file || isUploading}
              className="w-full"
            >
              {isUploading ? "Analyzing..." : "Analyze Report"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>
              View your previously analyzed reports and their insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No reports analyzed yet. Upload your first report to get started.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
