import React, { useState } from 'react';
import ScoreMeter from '../components/ScoreMeter';
import SectionButton from '../components/SectionButton';
import SectionDetail from '../components/SectionDetail';
import { FileText, BriefcaseIcon, GraduationCap, Award, Code, Layout, FileSpreadsheet, Layers, Palette, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeAnalysis = () => {
  const sections = [
    {
      id: 'overall',
      title: 'Overall Impact',
      icon: <Award className="h-5 w-5" />,
      score: 85,
      details: {
        strengths: [
          'Clear and professional presentation',
          'Strong quantifiable achievements',
          'Relevant skills highlighted'
        ],
        improvements: [
          'Add more industry-specific keywords',
          'Enhance personal branding statement',
          'Include more metrics and results'
        ],
        feedback: {
          overview: 'Your resume demonstrates strong potential with clear achievements and professional presentation.',
          recommendations: [
            'Incorporate more industry-specific keywords to improve ATS compatibility',
            'Strengthen your personal branding statement to stand out',
            'Add more quantifiable results to showcase impact'
          ],
          impact: 'These improvements could significantly increase your resume\'s effectiveness and interview chances.'
        }
      }
    },
    {
      id: 'content',
      title: 'Content Analysis',
      icon: <FileText className="h-5 w-5" />,
      score: 82,
      details: {
        strengths: ['Strong action verbs', 'Relevant keywords', 'Clear achievements'],
        improvements: ['Add more metrics', 'Enhance job descriptions', 'Include more industry terms'],
        feedback: {
          overview: 'Your resume content is well-written but could benefit from more specific details.',
          recommendations: [
            'Include more quantifiable achievements and metrics',
            'Add industry-specific terminology',
            'Enhance job descriptions with more impact-focused language'
          ],
          impact: 'Strong content directly influences how well your resume performs in ATS systems.'
        }
      }
    },
    {
      id: 'format',
      title: 'Format & Structure',
      icon: <Layout className="h-5 w-5" />,
      score: 88,
      details: {
        strengths: ['Clean layout', 'Consistent formatting', 'Good use of white space'],
        improvements: ['Adjust margins', 'Optimize section spacing', 'Standardize bullet points'],
        feedback: {
          overview: 'Your resume format is professional and easy to read.',
          recommendations: [
            'Fine-tune margin settings for optimal space usage',
            'Ensure consistent spacing between sections',
            'Standardize bullet point formatting'
          ],
          impact: 'A well-structured resume improves readability and professional appearance.'
        }
      }
    },
    {
      id: 'organization',
      title: 'Section Organization',
      icon: <Layers className="h-5 w-5" />,
      score: 86,
      details: {
        strengths: ['Logical flow', 'Clear hierarchy', 'Important info prominent'],
        improvements: ['Reorder sections', 'Group related items', 'Highlight key achievements'],
        feedback: {
          overview: 'Your resume sections follow a logical order but could be optimized.',
          recommendations: [
            'Place most relevant sections at the top',
            'Group related skills and experiences',
            'Create a dedicated achievements section'
          ],
          impact: 'Proper organization ensures key information is noticed quickly.'
        }
      }
    },
    {
      id: 'skills',
      title: 'Skills Assessment',
      icon: <Code className="h-5 w-5" />,
      score: 84,
      details: {
        strengths: ['Relevant technical skills', 'Good skill categorization', 'Updated technologies'],
        improvements: ['Add skill levels', 'Remove outdated skills', 'Include soft skills'],
        feedback: {
          overview: 'Your skills section effectively presents your capabilities.',
          recommendations: [
            'Include proficiency levels for technical skills',
            'Add more relevant soft skills',
            'Remove outdated or irrelevant skills'
          ],
          impact: 'A well-crafted skills section is crucial for technical positions.'
        }
      }
    },
    {
      id: 'style',
      title: 'Resume Style & Design',
      icon: <Palette className="h-5 w-5" />,
      score: 90,
      details: {
        strengths: ['Professional design', 'Consistent typography', 'Good visual hierarchy'],
        improvements: ['Enhance visual appeal', 'Adjust font sizes', 'Improve alignment'],
        feedback: {
          overview: 'Your resume has a clean, professional design that stands out.',
          recommendations: [
            'Fine-tune typography for better hierarchy',
            'Ensure consistent alignment throughout',
            'Consider subtle design elements to enhance appeal'
          ],
          impact: 'Professional design creates a strong first impression.'
        }
      }
    },
    {
      id: 'experience',
      title: 'Experience Details',
      icon: <BriefcaseIcon className="h-5 w-5" />,
      score: 87,
      details: {
        strengths: ['Clear progression', 'Relevant experience', 'Achievement-focused'],
        improvements: ['Add more context', 'Highlight leadership', 'Include projects'],
        feedback: {
          overview: 'Your experience section effectively showcases your career growth.',
          recommendations: [
            'Add more context to key achievements',
            'Highlight leadership and initiative',
            'Include relevant projects and outcomes'
          ],
          impact: 'Detailed experience section demonstrates your value to employers.'
        }
      }
    },
    {
      id: 'education',
      title: 'Education Background',
      icon: <GraduationCap className="h-5 w-5" />,
      score: 83,
      details: {
        strengths: ['Relevant degrees', 'Academic achievements', 'Recent certifications'],
        improvements: ['Add coursework', 'Include GPA', 'List honors'],
        feedback: {
          overview: 'Your education section provides a good foundation.',
          recommendations: [
            'Include relevant coursework',
            'Add academic achievements and honors',
            'List any additional certifications'
          ],
          impact: 'Strong education credentials can set you apart from other candidates.'
        }
      }
    }
  ];

  const [activeSection, setActiveSection] = useState(sections[0]);

  const handleDownload = () => {
    // Implement PDF report generation here
    console.log('Downloading report...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScoreMeter score={85} sections={sections} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              {sections.map((section) => (
                <SectionButton
                  key={section.id}
                  icon={section.icon}
                  title={section.title}
                  score={section.score}
                  isActive={activeSection.id === section.id}
                  onClick={() => setActiveSection(section)}
                />
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
              >
                <Download className="h-5 w-5" />
                <span>Download Full Report</span>
              </motion.button>
            </div>
            
            <div className="md:col-span-2">
              <SectionDetail section={activeSection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;