
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/ImageUploader';
import DamageAssessment, { SeverityLevel } from '@/components/DamageAssessment';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import { analyzeVehicleDamage } from '@/services/assessmentService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    severity: SeverityLevel;
    confidence: number;
    damageAreas: string[];
    repairSuggestions: string[];
    estimatedCost: {
      min: number;
      max: number;
    };
  } | null>(null);

  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    setAssessmentResult(null);
  };

  const handleAssessment = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image of vehicle damage to assess",
        variant: "destructive",
      });
      return;
    }

    setIsAssessing(true);
    
    try {
      const result = await analyzeVehicleDamage(selectedImage);
      setAssessmentResult(result);
      
      toast({
        title: "Assessment Complete",
        description: `Your vehicle damage has been assessed as ${result.severity}`,
      });
    } catch (error) {
      console.error("Error assessing image:", error);
      toast({
        title: "Assessment Failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAssessing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAssessmentResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-theme-lightBlue to-white py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Vehicle Damage Assessment
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Upload a photo of vehicle damage and get an instant assessment with repair suggestions.
            </p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Upload Damage Photo</h2>
              
              <ImageUploader onImageSelected={handleImageSelected} />
              
              {selectedImage && !assessmentResult && (
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={isAssessing}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAssessment}
                    disabled={isAssessing}
                  >
                    {isAssessing ? 'Analyzing...' : 'Assess Damage'}
                  </Button>
                </div>
              )}
              
              <DamageAssessment
                isLoading={isAssessing}
                severity={assessmentResult?.severity}
                confidence={assessmentResult?.confidence}
                damageAreas={assessmentResult?.damageAreas}
                repairSuggestions={assessmentResult?.repairSuggestions}
                estimatedCost={assessmentResult?.estimatedCost}
              />
              
              {assessmentResult && (
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                  >
                    Start Over
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <HowItWorks />
        
        <section className="py-12 bg-theme-lightBlue">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to assess your vehicle damage?</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Get a quick and accurate assessment of your vehicle damage and repair options.
            </p>
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Upload a Photo Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
