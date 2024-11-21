import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScoreMeter from '../components/ScoreMeter';
import SectionButton from '../components/SectionButton';
import SectionDetail from '../components/SectionDetail';
import { 
  FileText, BriefcaseIcon, GraduationCap, Award, 
  Code, Layout, Layers, Palette, Download 
} from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ResumeAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // Check if analysis data was passed during navigation
    const { analysisResult } = location.state || {};
    
    if (!analysisResult) {
      // Redirect back to upload page if no data
      navigate('/');
      return;
    }

    // Transform the analysis data into the sections format
    const transformedSections = [
      {
        id: 'overall',
        title: 'ATS Parse Rate',
        icon: <Award className="h-5 w-5" />,
        score: analysisResult.ats_parse_rate?.score || 0,
        details: {
          strengthsHeading: 'ATS Parsing Strengths',
          improvementsHeading: 'Suggestions for ATS Compatibility',
          strengths: ['ATS Parsing Details'],
          improvements: ['Improve ATS Compatibility'],
          feedback: {
            overview: analysisResult.ats_parse_rate?.reason || 'No specific ATS parse rate details available.',
            recommendations: ['Optimize resume for ATS systems'],
            impact: 'ATS parsing is crucial for initial screening.'
          }
        }
      },
      {
        id: 'content',
        title: 'Contact Information',
        icon: <FileText className="h-5 w-5" />,
        score: analysisResult.contact_information?.score || 0,
        details: {
          strengthsHeading: 'Contact Information Strengths',
          improvementsHeading: 'Contact Details Suggestions',
          strengths: ['Contact Information Evaluation'],
          improvements: ['Enhance Contact Details'],
          feedback: {
            overview: analysisResult.contact_information?.reason || 'No specific contact information details available.',
            recommendations: ['Ensure all contact details are clear and professional'],
            impact: 'Clear contact information is essential for potential employers.'
          }
        }
      },
      {
        id: 'skills',
        title: 'Skills Analysis',
        icon: <Code className="h-5 w-5" />,
        score: analysisResult.skills_analysis?.hard_skills?.score || 0,
        details: {
          strengthsHeading: 'Matched Hard Skills',
          improvementsHeading: 'Soft Skills Suggestions',
          strengths: analysisResult.skills_analysis?.hard_skills?.matched || ['No specific hard skills matched'],
          improvements: analysisResult.skills_analysis?.soft_skills?.matched || ['No improvements suggested'],
          feedback: {
            overview: analysisResult.skills_analysis?.reason || 'No specific skills analysis available.',
            recommendations: ['Continuously update and refine skills'],
            impact: 'Skills are crucial in demonstrating job readiness.'
          }
        }
      },
      {
        id: 'format',
        title: 'Description Quality',
        icon: <Layout className="h-5 w-5" />,
        score: analysisResult.description_quality?.score || 0,
        details: {
          strengthsHeading: 'Resume Description Strengths',
          improvementsHeading: 'Suggestions for Description Clarity',
          strengths: ['Description Evaluation'],
          improvements: ['Enhance Resume Description'],
          feedback: {
            overview: analysisResult.description_quality?.reason || 'No specific description quality details available.',
            recommendations: ['Improve resume language and clarity'],
            impact: 'Clear and concise descriptions attract employer attention.'
          }
        }
      },
      {
        id: 'experience',
        title: 'Experience Analysis',
        icon: <BriefcaseIcon className="h-5 w-5" />,
        score: analysisResult.experience_analysis?.score || 0,
        details: {
          strengthsHeading: 'Professional Experience Highlights',
          improvementsHeading: 'Experience Enhancement Suggestions',
          strengths: ['Experience Evaluation'],
          improvements: ['Enhance Professional Experience'],
          feedback: {
            overview: analysisResult.experience_analysis?.reason || 'No specific experience details available.',
            recommendations: ['Highlight key achievements and responsibilities'],
            impact: 'Detailed experience showcases professional growth.'
          }
        }
      },
      {
        id: 'education',
        title: 'Education Analysis',
        icon: <GraduationCap className="h-5 w-5" />,
        score: analysisResult.education_analysis?.score || 0,
        details: {
          strengthsHeading: 'Education Strengths',
          improvementsHeading: 'Suggestions for Academic Improvements',
          strengths: ['Educational Background Evaluation'],
          improvements: ['Highlight Academic Achievements'],
          feedback: {
            overview: analysisResult.education_analysis?.reason || 'No specific education details available.',
            recommendations: ['Showcase relevant academic credentials'],
            impact: 'Strong educational background can differentiate candidates.'
          }
        }
      },
      {
        id: 'organization',
        title: 'Projects Analysis',
        icon: <Layers className="h-5 w-5" />,
        score: analysisResult.projects_analysis?.score || 0,
        details: {
          strengthsHeading: 'Project Strengths',
          improvementsHeading: 'Suggestions for Project Details',
          strengths: ['Project Evaluation'],
          improvements: ['Add More Project Details'],
          feedback: {
            overview: analysisResult.projects_analysis?.reason || 'No specific projects details available.',
            recommendations: ['Include detailed project descriptions'],
            impact: 'Projects demonstrate practical skills and initiative.'
          }
        }
      },
      {
        id: 'style',
        title: 'Overall Summary',
        icon: <Palette className="h-5 w-5" />,
        score: analysisResult.overall_summary?.total_score || 0,
        details: {
          strengthsHeading: 'Overall Resume Strengths',
          improvementsHeading: 'General Resume Suggestions',
          strengths: ['Overall Resume Evaluation'],
          improvements: ['Continuous Improvement'],
          feedback: {
            overview: analysisResult.overall_summary?.summary || 'No specific overall summary available.',
            recommendations: ['Continuously refine resume based on feedback'],
            impact: 'A strong overall resume increases job application success.'
          }
        }
      }
    ];
    
    setActiveSection(transformedSections[0]);
    setAnalysisData({
      sections: transformedSections,
      overallScore: analysisResult.overall_summary?.total_score || 0
    });
  }, [location.state, navigate]);

  const handleDownload = () => {
    const doc = new jsPDF();
    const { sections, overallScore } = analysisData;

    // Add Title
    doc.setFontSize(18);
    doc.text('Resume Analysis Report', 10, 10);

    // Add Overall Score
    doc.setFontSize(14);
    doc.text(`Overall Score: ${overallScore}`, 10, 20);

    // Add Section Details in Table
    const tableData = sections.map((section) => [
      section.title,
      section.score,
      section.details.strengths.join(', '),
      section.details.improvements.join(', ')
    ]);
    autoTable(doc, {
      head: [['Section', 'Score', 'Strengths', 'Improvements']],
      body: tableData,
      startY: 30
    });

    // Save the PDF
    doc.save('Resume_Analysis_Report.pdf');
  };

  if (!analysisData) {
    return <div className="min-h-screen flex items-center justify-center">Loading analysis...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScoreMeter score={analysisData.overallScore} sections={analysisData.sections} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              {analysisData.sections.map((section) => (
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