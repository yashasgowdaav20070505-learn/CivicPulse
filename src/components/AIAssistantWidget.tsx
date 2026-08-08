import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Mic,
  MicOff,
  Send,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Globe,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantWidget: React.FC = () => {
  const { user, selectedLanguage, t } = useApp();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-01',
      sender: 'ai',
      text: `Namaste ${user?.fullName || 'Citizen'}! I am your CivicPulse AI Assistant. Ask me anything about central & state schemes, eligibility, documents, or step-by-step application procedures in any language!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Voice state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const isStartedRef = useRef<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Speech Recognition initialization
  useEffect(() => {
    let rec: any = null;

    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      const langMap: Record<string, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        kn: 'kn-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        mr: 'mr-IN',
        bn: 'bn-IN'
      };
      rec.lang = langMap[selectedLanguage] || 'en-IN';

      rec.onstart = () => {
        isStartedRef.current = true;
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        isStartedRef.current = false;
        setIsListening(false);
        handleSendMessage(transcript);
      };

      rec.onerror = (err: any) => {
        console.warn('Speech recognition status:', err?.error || err);
        isStartedRef.current = false;
        setIsListening(false);
      };

      rec.onend = () => {
        isStartedRef.current = false;
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    return () => {
      if (rec && isStartedRef.current) {
        try {
          rec.abort();
        } catch (e) {
          // ignore
        }
      }
      isStartedRef.current = false;
    };
  }, [selectedLanguage]);

  const toggleVoiceListen = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening || isStartedRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore if already stopped
      }
      isStartedRef.current = false;
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (e: any) {
        if (e?.name !== 'InvalidStateError') {
          console.warn('Speech recognition notice:', e);
        }
        // If already started or transitioning state, reset state safely
        isStartedRef.current = true;
        setIsListening(true);
      }
    }
  };

  const playTTSAudio = async (textToSpeak: string) => {
    try {
      setIsSpeaking(true);
      const res = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, language: selectedLanguage })
      });
      const data = await res.json();

      if (data.audioBase64) {
        // Play PCM audio or browser fallback
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const binary = atob(data.audioBase64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        // Decode PCM 16-bit array
        const pcm16 = new Int16Array(bytes.buffer);
        const float32 = new Float32Array(pcm16.length);
        for (let i = 0; i < pcm16.length; i++) {
          float32[i] = pcm16[i] / 32768.0;
        }
        const buffer = audioCtx.createBuffer(1, float32.length, 24000);
        buffer.getChannelData(0).set(float32);

        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start(0);
      } else {
        // Fallback Web Speech Synthesis with native language support
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel(); // stop previous speech
          const langMap: Record<string, string> = {
            en: 'en-IN',
            hi: 'hi-IN',
            kn: 'kn-IN',
            te: 'te-IN',
            ta: 'ta-IN',
            mr: 'mr-IN',
            bn: 'bn-IN'
          };
          const cleanText = textToSpeak.replace(/[*_#`•]/g, '').slice(0, 300);
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = langMap[selectedLanguage] || 'en-IN';
          utterance.rate = 1.0;
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => setIsSpeaking(false);
          window.speechSynthesis.speak(utterance);
        } else {
          setIsSpeaking(false);
        }
      }
    } catch (err) {
      console.error('TTS playback error:', err);
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userProfile: user,
          selectedLanguage
        })
      });

      const data = await res.json();
      const aiReply = data.reply || 'I am here to guide you on all central and state welfare schemes.';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      if (mode === 'voice') {
        playTTSAudio(aiReply);
      }
    } catch (err) {
      console.error('Chat AI request failed:', err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'I am experiencing a momentary connection issue. Please retry or ask about PM-Kisan, Ayushman Bharat, or Gruha Lakshmi.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Toggle Icon (When Closed) - Designed with Oppo Glowing Headset Ears */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 bg-[#3B7E76] hover:bg-[#2F6861] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_0_25px_rgba(59,126,118,0.5)] transition-all hover:scale-105 cursor-pointer group border-2 border-[#83C0AD]"
          title="Open CivicPulse AI Assistant with Headset Mode"
        >
          {/* Left Glowing Ear Piece */}
          <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-gradient-to-r from-[#83C0AD] to-[#3B7E76] rounded-l-full shadow-[0_0_10px_#83C0AD] border-l border-t border-b border-white/60 animate-pulse" />
          
          {/* Right Glowing Ear Piece */}
          <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-gradient-to-l from-[#83C0AD] to-[#3B7E76] rounded-r-full shadow-[0_0_10px_#83C0AD] border-r border-t border-b border-white/60 animate-pulse" />

          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#83C0AD] rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#83C0AD] rounded-full" />
          </div>
          <span className="font-bold text-xs hidden sm:inline tracking-wide font-serif">
            CivicPulse AI Guide
          </span>
        </button>
      )}

      {/* Expanded Floating Assistant Widget Window */}
      {isOpen && (
        <div className="bg-[#FFFFFF] border-2 border-[#83C0AD] rounded-3xl w-[92vw] sm:w-[410px] h-[530px] max-h-[85vh] shadow-[0_10px_30px_rgba(59,126,118,0.25)] flex flex-col justify-between overflow-hidden transition-all relative">
          
          {/* Glowing Top Headset Arc */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#83C0AD] via-[#3B7E76] to-[#83C0AD] animate-pulse" />

          {/* Header */}
          <div className="p-4 bg-[#3B7E76] text-white flex items-center justify-between shadow-xs relative">
            
            {/* Decorative Side Ear Accents on Header */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#83C0AD] rounded-r-full shadow-[0_0_8px_#83C0AD]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#83C0AD] rounded-l-full shadow-[0_0_8px_#83C0AD]" />

            <div className="flex items-center gap-2.5 pl-2">
              <div className="w-9 h-9 rounded-xl bg-[#83C0AD]/30 text-white flex items-center justify-center border border-[#83C0AD]/50 relative shadow-inner">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#83C0AD] rounded-full animate-ping" />
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-wide font-serif leading-tight flex items-center gap-1.5">
                  <span>CivicPulse AI Assistant</span>
                  <span className="text-[9px] font-semibold uppercase bg-[#83C0AD] text-[#1A2E2B] px-1.5 py-0.2 rounded-full">
                    Active
                  </span>
                </h3>
                <p className="text-[10px] text-[#C9D7D5] leading-tight">
                  Jargon-Free Scheme & Document Engine
                </p>
              </div>
            </div>

            {/* Mode Switcher & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode(mode === 'chat' ? 'voice' : 'chat')}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
                  mode === 'voice'
                    ? 'bg-[#83C0AD] text-[#1A2E2B]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                title="Switch between Chat and Voice Mode"
              >
                {mode === 'voice' ? <Mic className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                <span>{mode === 'voice' ? 'Voice Mode' : 'Chat Mode'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container / Voice Visualizer */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F4F8F7] text-xs">
            
            {/* Mode Banner */}
            <div className="text-[10px] text-center text-[#797E89] bg-[#C9D7D5]/20 py-1 px-3 rounded-full max-w-xs mx-auto border border-[#C9D7D5]/40">
              {mode === 'voice'
                ? '🎙️ Live Voice Mode: Tap mic to speak in regional language'
                : '💬 Text Mode: Ask anything about schemes and eligibility'}
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#3B7E76] text-white flex items-center justify-center shrink-0 text-[10px] font-bold mt-1">
                    CP
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#3B7E76] text-white rounded-br-none shadow-xs'
                      : 'bg-white text-[#1A2E2B] border border-[#C9D7D5] rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-[#797E89]'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[#797E89] text-[11px] bg-white p-2.5 rounded-2xl border border-[#C9D7D5] w-28">
                <Sparkles className="w-3.5 h-3.5 text-[#3B7E76] animate-spin" />
                <span>Thinking...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Footer Area */}
          <div className="p-3 bg-white border-t border-[#C9D7D5]">
            {mode === 'voice' ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <button
                  onClick={toggleVoiceListen}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[#3B7E76] hover:bg-[#2F6861] text-white'
                  }`}
                >
                  {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <div className="text-[11px] font-semibold text-[#1A2E2B]">
                  {isListening ? 'Listening to speech...' : isSpeaking ? 'Speaking response...' : 'Tap Mic to Speak'}
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t('typeMessage')}
                  className="flex-1 bg-[#F4F8F7] text-xs text-[#1A2E2B] placeholder-[#797E89] px-3.5 py-2.5 rounded-xl border border-[#C9D7D5] focus:outline-none focus:border-[#3B7E76]"
                />

                <button
                  type="button"
                  onClick={toggleVoiceListen}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isListening ? 'bg-red-100 text-red-600 border-red-300' : 'bg-[#F4F8F7] text-[#3B7E76] border-[#C9D7D5]'
                  }`}
                  title="Voice dictation input"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-[#3B7E76] hover:bg-[#2F6861] text-white p-2.5 rounded-xl transition-all disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
