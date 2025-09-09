import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera, RotateCcw, Square, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Target } from 'lucide-react-native';

interface PosePoint {
  x: number;
  y: number;
  confidence: number;
}

interface PostureAnalysis {
  overall_score: number;
  feedback: string[];
  key_points: {
    [key: string]: PosePoint;
  };
}

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [postureData, setPostureData] = useState<PostureAnalysis | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Camera size={80} color="#2563EB" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          We need camera access to provide real-time posture analysis and exercise feedback.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startPostureAnalysis = () => {
    setIsAnalyzing(true);
    setIsRecording(true);
    
    // Simulate pose estimation processing
    setTimeout(() => {
      const mockAnalysis: PostureAnalysis = {
        overall_score: Math.floor(Math.random() * 30) + 70, // 70-100%
        feedback: [
          "Keep your shoulders straight",
          "Excellent spine alignment",
          "Try to lift your chin slightly"
        ],
        key_points: {
          nose: { x: 0.5, y: 0.3, confidence: 0.9 },
          left_shoulder: { x: 0.4, y: 0.45, confidence: 0.85 },
          right_shoulder: { x: 0.6, y: 0.45, confidence: 0.85 },
        }
      };
      
      setPostureData(mockAnalysis);
      setIsAnalyzing(false);
      setIsRecording(false);
    }, 3000);
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    setIsRecording(false);
    setPostureData(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Posture Coach</Text>
        <TouchableOpacity onPress={toggleCameraFacing} style={styles.flipButton}>
          <RotateCcw size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing}>
          {/* Pose Overlay */}
          {postureData && (
            <View style={styles.poseOverlay}>
              {Object.entries(postureData.key_points).map(([point, data]) => (
                <View
                  key={point}
                  style={[
                    styles.keyPoint,
                    {
                      left: `${data.x * 100}%`,
                      top: `${data.y * 100}%`,
                      opacity: data.confidence,
                    },
                  ]}
                />
              ))}
            </View>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>ANALYZING</Text>
            </View>
          )}
        </CameraView>

        {/* Guidelines Overlay */}
        <View style={styles.guidelinesOverlay}>
          <View style={styles.centerGuide}>
            <Target size={40} color="#FFFFFF" strokeWidth={1.5} />
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            isAnalyzing && styles.analyzingButton,
          ]}
          onPress={isAnalyzing ? stopAnalysis : startPostureAnalysis}
          disabled={isAnalyzing}
        >
          <Square size={24} color="#FFFFFF" />
          <Text style={styles.analyzeButtonText}>
            {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results Panel */}
      {postureData && (
        <View style={styles.resultsPanel}>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text
                style={[
                  styles.scoreText,
                  { color: getScoreColor(postureData.overall_score) },
                ]}
              >
                {postureData.overall_score}%
              </Text>
            </View>
            <Text style={styles.scoreLabel}>Posture Score</Text>
          </View>
          
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>Feedback</Text>
            {postureData.feedback.map((feedback, index) => (
              <View key={index} style={styles.feedbackItem}>
                {feedback.includes('Excellent') ? (
                  <CheckCircle size={16} color="#10B981" />
                ) : (
                  <AlertCircle size={16} color="#F59E0B" />
                )}
                <Text style={styles.feedbackText}>{feedback}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  flipButton: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  poseOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  keyPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginLeft: -6,
    marginTop: -6,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
    marginRight: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  guidelinesOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  centerGuide: {
    opacity: 0.5,
  },
  controls: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  analyzeButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  analyzingButton: {
    backgroundColor: '#64748B',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resultsPanel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  feedbackContainer: {
    marginTop: 8,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
    flex: 1,
  },
});