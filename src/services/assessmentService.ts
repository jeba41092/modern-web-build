
import { SeverityLevel } from '@/components/DamageAssessment';

interface AssessmentResult {
  severity: SeverityLevel;
  confidence: number;
  damageAreas: string[];
  repairSuggestions: string[];
  estimatedCost: {
    min: number;
    max: number;
  };
}

// Mock assessment service to simulate AI analysis
// In a real application, this would call a backend API or ML model
export const analyzeVehicleDamage = async (imageFile: File): Promise<AssessmentResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // For demo purposes, randomly select one of three possible assessment results
  const randomSeverity = Math.floor(Math.random() * 3);
  
  const assessments: AssessmentResult[] = [
    {
      severity: 'minor',
      confidence: 0.89,
      damageAreas: ['Front bumper', 'Left headlight'],
      repairSuggestions: [
        'Buff out surface scratches on the bumper',
        'Replace damaged headlight assembly',
        'Touch up paint on affected areas'
      ],
      estimatedCost: {
        min: 350,
        max: 750
      }
    },
    {
      severity: 'moderate',
      confidence: 0.92,
      damageAreas: ['Left front door', 'Left front fender', 'Side mirror'],
      repairSuggestions: [
        'Repair dents on the door panel',
        'Replace side mirror assembly',
        'Paint and blend affected panels',
        'Check for structural integrity of door frame'
      ],
      estimatedCost: {
        min: 1200,
        max: 2800
      }
    },
    {
      severity: 'severe',
      confidence: 0.95,
      damageAreas: ['Front end', 'Hood', 'Radiator', 'Bumper', 'Both headlights'],
      repairSuggestions: [
        'Replace front bumper assembly',
        'Replace and repaint hood',
        'Replace radiator and check cooling system',
        'Verify frame alignment',
        'Replace both headlight assemblies'
      ],
      estimatedCost: {
        min: 3500,
        max: 7800
      }
    }
  ];
  
  return assessments[randomSeverity];
};
