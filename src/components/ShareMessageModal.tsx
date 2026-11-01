import React, { useState } from 'react';
import { Copy, Check, Share2, MessageCircle, Heart, X } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config';
import { romanticAudio } from '../utils/audio';

interface ShareMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareMessageModal: React.FC<ShareMessageModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const messageWithUrl = `${BIRTHDAY_CONFIG.shareMessage}\n\n👉 ${currentUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BIRTHDAY_CONFIG.shareMessage);
      setCopied(true);
      romanticAudio.playSparkle();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = BIRTHDAY_CONFIG.shareMessage;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(messageWithUrl);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="max-w-lg w-full glass-card rounded-3xl p-6 sm:p-8 border border-sky-400/30 relative shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-sky-300" />
          <span>Message to send with this website</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-script text-white mb-2">
          Send This To Ammu 💌
        </h3>
        
        <p className="text-xs text-sky-200/70 mb-4">
          Copy this heartfelt Tanglish message and send it on WhatsApp or Instagram right before she opens this link:
        </p>

        {/* Message Box */}
        <div className="relative rounded-2xl bg-white/5 border border-sky-400/25 p-4 sm:p-5 font-handwriting text-lg sm:text-xl text-sky-100 whitespace-pre-line leading-relaxed shadow-inner">
          {BIRTHDAY_CONFIG.shareMessage}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleCopy}
            className={`w-full sm:flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:opacity-90'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard! 📋💙</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Message 📋</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Romantic Subnote */}
        <div className="mt-4 text-center">
          <span className="text-[11px] text-sky-300/70 font-handwriting text-sm inline-flex items-center gap-1">
            <Heart className="w-3 h-3 text-sky-400 fill-sky-400 inline" />
            Her smile will be the most precious sight in the universe! 🥹💙
          </span>
        </div>

      </div>
    </div>
  );
};
