
import React from 'react';
import { Car, Check, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export type SeverityLevel = 'minor' | 'moderate' | 'severe';

interface DamageAssessmentProps {
  isLoading: boolean;
  severity?: SeverityLevel;
  confidence?: number;
  damageAreas?: string[];
  repairSuggestions?: string[];
  estimatedCost?: {
    min: number;
    max: number;
  };
}

const DamageAssessment: React.FC<DamageAssessmentProps> = ({
  isLoading,
  severity,
  confidence,
  damageAreas,
  repairSuggestions,
  estimatedCost,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full mt-6 assessment-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Car className="h-5 w-5 mr-2 text-theme-blue" />
            Analyzing Damage...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Analysis in progress</p>
              <Progress value={45} className="animate-pulse-subtle" />
            </div>
            <p className="text-sm text-gray-500 italic">
              Our AI is analyzing your vehicle damage. This should take just a moment...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!severity) return null;

  const getSeverityBadgeClass = () => {
    switch (severity) {
      case 'minor':
        return 'severity-minor';
      case 'moderate':
        return 'severity-moderate';
      case 'severe':
        return 'severity-severe';
      default:
        return '';
    }
  };

  const getSeverityText = () => {
    switch (severity) {
      case 'minor':
        return 'Minor damage that should be relatively easy to repair';
      case 'moderate':
        return 'Moderate damage requiring professional attention';
      case 'severe':
        return 'Severe damage requiring extensive repairs';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full mt-6 assessment-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Car className="h-5 w-5 mr-2 text-theme-blue" />
          Damage Assessment
          <span className={`severity-indicator ${getSeverityBadgeClass()}`}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Assessment Summary</h3>
            <p className="text-gray-700">
              {getSeverityText()}
            </p>
            {confidence && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Confidence: {Math.round(confidence * 100)}%</p>
                <Progress value={confidence * 100} className="h-2" />
              </div>
            )}
          </div>

          {damageAreas && damageAreas.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Affected Areas</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {damageAreas.map((area, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {repairSuggestions && repairSuggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Repair Suggestions</h3>
              <ul className="space-y-2">
                {repairSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <Info className="h-4 w-4 mr-2 text-theme-blue shrink-0 mt-1" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {estimatedCost && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Estimated Repair Cost</h3>
              <p className="text-2xl font-bold text-theme-blue">
                ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                *This is an estimate only. Actual costs may vary based on your location, shop rates, and parts availability.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DamageAssessment;
