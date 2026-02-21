"use client";

import {
  X,
  Upload,
  Image as ImageIcon,
  Video,
  Smile,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useAppSelector } from "@/hooks/useRedux";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckInModal({ isOpen, onClose }: Props) {
  const theme = useAppSelector((state) => state.global.theme);
  const isDark = theme === "dark";

  const [text, setText] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setMedia(file);
    setPreview(URL.createObjectURL(file));
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const isVideo = media?.type.startsWith("video");

  const isSubmitEnabled = text.length > 0 || media;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={clsx(
          "absolute inset-0 backdrop-blur-md",
          isDark ? "bg-black/70" : "bg-black/30",
        )}
      />

      {/* Modal */}
      <div
        className={clsx(
          "relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 transition overflow-hidden",
          isDark
            ? "bg-gradient-to-b from-[#1c1c22] to-[#121214] text-white"
            : "bg-gradient-to-b from-white to-gray-100 text-gray-900",
        )}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className={clsx(
            "absolute top-5 right-5 p-3 rounded-full",
            isDark ? "bg-white/10" : "bg-gray-200",
          )}
        >
          <X />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <Image
            src="/assets/profile.png"
            alt="user"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">Ashraf Idrishi</h3>
            {!text && (
              <p className="opacity-60 mt-1">What did you complete today?</p>
            )}
          </div>
        </div>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your progress..."
          className={clsx(
            "mt-6 w-full bg-transparent outline-none resize-none text-lg",
            isDark ? "placeholder-gray-500" : "placeholder-gray-400",
          )}
        />

        {/* Upload Area */}
        {!preview && (
          <label
            className={clsx(
              "mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer h-60",
              isDark
                ? "border-white/20 bg-white/5"
                : "border-gray-300 bg-gray-50",
            )}
          >
            <Upload className="mb-3 opacity-60" />
            <p className="font-medium">Upload</p>
            <span className="text-sm opacity-60 text-center px-6">
              Images/Videos should be horizontal, at least 1280×720px. Max size
              2MB.
            </span>

            <input
              type="file"
              hidden
              accept="image/*,video/*"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
          </label>
        )}

        {/* Preview */}
        {preview && (
          <div
            className={clsx(
              "mt-6 relative rounded-2xl overflow-hidden border",
              isDark ? "border-white/10" : "border-gray-200",
            )}
          >
            {isVideo ? (
              <>
                <video ref={videoRef} src={preview} className="w-full h-auto" />
                <button
                  onClick={toggleVideo}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {isPlaying ? <Pause size={50} /> : <Play size={50} />}
                </button>
              </>
            ) : (
              <img src={preview} className="w-full h-auto" />
            )}
          </div>
        )}

        {/* Bottom Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-4">
            <label className="p-3 rounded-full bg-blue-500/20 cursor-pointer">
              <ImageIcon className="text-blue-500" />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleFile(e.target.files[0])
                }
              />
            </label>

            <label className="p-3 rounded-full bg-red-500/20 cursor-pointer">
              <Video className="text-red-500" />
              <input
                hidden
                type="file"
                accept="video/*"
                onChange={(e) =>
                  e.target.files && handleFile(e.target.files[0])
                }
              />
            </label>

            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-3 rounded-full bg-yellow-500/20"
            >
              <Smile className="text-yellow-500" />
            </button>
          </div>

          <button
            disabled={!isSubmitEnabled}
            className={clsx(
              "px-6 py-3 rounded-full font-semibold transition",
              isSubmitEnabled
                ? "bg-yellow-600 hover:bg-yellow-500 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed",
            )}
          >
            Submit Checkin
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmoji && (
          <div className="mt-4">
            <EmojiPicker
              theme={isDark ? Theme.DARK : Theme.LIGHT}
              onEmojiClick={(emojiData) =>
                setText((prev) => prev + emojiData.emoji)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
