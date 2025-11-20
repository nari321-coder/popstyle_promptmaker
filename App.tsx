import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import { analyzeFashionImage } from './services/geminiService';
import { ImageFile, AnalysisState } from './types';
import { Zap, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    status: 'idle',
    promptResult: null
  });

  const handleImageSelected = (image: ImageFile | null) => {
    setSelectedImage(image);
    setAnalysisState({ status: 'idle', promptResult: null });
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setAnalysisState({ status: 'analyzing', promptResult: null });

    try {
      const result = await analyzeFashionImage(selectedImage.base64);
      setAnalysisState({
        status: 'complete',
        promptResult: result
      });
    } catch (error) {
      setAnalysisState({
        status: 'error',
        promptResult: null,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      <Header />

      <main className="max-w-4xl mx-auto mt-8">
        {/* Main Card Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[40px] p-6 md:p-10 shadow-xl border-4 border-white">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-pop text-pop-black mb-3">
              お洋服の<span className="text-pop-pink inline-block transform -rotate-3 bg-pop-black text-white px-2 py-1 mx-1 text-lg md:text-2xl rounded-md">画像</span>から<br className="md:hidden"/>
              魔法の<span className="text-pop-cyan inline-block transform rotate-2 bg-pop-black text-white px-2 py-1 mx-1 text-lg md:text-2xl rounded-md">呪文</span>を作るよ！
            </h2>
            <p className="text-gray-600 font-medium">
              コーデ写真をアップロードして、AI画像生成用のプロンプトをGETしよう✨
            </p>
          </div>

          <ImageUploader 
            onImageSelected={handleImageSelected} 
            selectedImage={selectedImage} 
            isAnalyzing={analysisState.status === 'analyzing'}
          />

          {selectedImage && analysisState.status !== 'analyzing' && analysisState.status !== 'complete' && (
             <div className="flex justify-center mt-6 animate-in zoom-in duration-300">
              <button
                onClick={handleAnalyze}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-pop text-xl text-white transition-all duration-200 bg-pop-black font-bold rounded-full hover:bg-pop-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pop-black border-4 border-transparent hover:border-pop-black hover:shadow-hard hover:-translate-y-1"
              >
                <Zap className="mr-2 fill-pop-yellow text-pop-yellow group-hover:animate-bounce" />
                プロンプト生成！
              </button>
            </div>
          )}

          {analysisState.status === 'analyzing' && (
            <div className="flex flex-col items-center justify-center mt-8 space-y-4 animate-in fade-in">
              <div className="relative">
                 <div className="w-16 h-16 border-4 border-pop-black border-t-pop-pink rounded-full animate-spin"></div>
                 <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-pop-cyan rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              <p className="font-pop text-lg animate-pulse text-pop-purple">
                お洋服を分析中... 🎨
              </p>
            </div>
          )}

          {analysisState.status === 'error' && (
            <div className="mt-8 bg-red-100 border-4 border-red-500 text-red-700 px-6 py-4 rounded-2xl font-bold text-center shadow-hard">
              {analysisState.error}
            </div>
          )}

          {analysisState.status === 'complete' && analysisState.promptResult && (
            <AnalysisResult prompt={analysisState.promptResult} />
          )}
        
        </div>
      </main>

      {/* Footer / Credits */}
      <footer className="text-center mt-12 font-outfit text-pop-black/60 text-sm font-bold">
        <p>Powered by Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;
