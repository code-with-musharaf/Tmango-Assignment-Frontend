"use client";

import { useApi } from "@/hooks/useApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setRefetchValue } from "@/redux/slices/global.slice";
import clsx from "clsx";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  Image as ImageIcon,
  Loader2,
  Pause,
  Play,
  Smile,
  Upload,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckInModal({ isOpen, onClose }: Props) {
  const { theme, selectedDay } = useAppSelector((state) => state.global);
  const { submitCheckin } = useApi();
  const dispatch = useAppDispatch();

  const isDark = theme === "dark";
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [base64, setBase64] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // const handleFile = (file: File) => {
  //   setMedia(file);
  //   setPreview(URL.createObjectURL(file));
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     if (e.target?.result) {
  //       setBase64(e.target.result as string);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // };

  const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFile = (file: File) => {
    if (!file) return;

    // Reset previous error
    setError(null);
    console.log({ type: file.type, size: file.size });

    // Validate video size
    if (file.type.startsWith("video/")) {
      if (file.size > MAX_VIDEO_SIZE) {
        setError("Video size must be less than 10MB.");
        return;
      }
    }

    // Validate image size
    if (file.type.startsWith("image/")) {
      if (file.size > MAX_IMAGE_SIZE) {
        setError("Image size must be less than 5MB.");
        return;
      }
    }

    // Set preview using object URL (safe for large files)
    const previewUrl = URL.createObjectURL(file);
    setMedia(file);
    setPreview(previewUrl);

    // Only convert small images to base64 (avoid video base64)
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        setBase64(e.target.result as string);
      }
    };

    reader.readAsDataURL(file);
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

  // handle submit chekin
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        title: text,
        description: "",
        dayCount: selectedDay,
        assetType: media?.type.startsWith("video")
          ? "video"
          : media?.type.startsWith("image")
            ? "image"
            : null,
        assetLink: base64,
      };
      await submitCheckin(data);
      onClose();
      dispatch(setRefetchValue("sidebar"));
      setTimeout(() => {
        dispatch(setRefetchValue(""));
      }, 5000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
            "cursor-pointer",
          )}
        >
          <X />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <Image
            src="/assets/profile.jpg"
            alt="user"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">Musharaf Haque</h3>
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
              10MB.
            </span>

            <input
              type="file"
              hidden
              accept="image/*,video/*"
              onChange={(e) => {
                setError(null);
                e.target.files && handleFile(e.target.files[0]);
              }}
            />
          </label>
        )}
        {!!error && <p className="text-red-500">{error}</p>}

        {/* Preview */}
        {preview && (
          <div
            className={clsx(
              "mt-6 relative rounded-2xl overflow-hidden border max-h-[500px]",
              isDark ? "border-white/10" : "border-gray-200",
            )}
          >
            {isVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={preview}
                  className="w-full h-auto object-cover"
                />
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
            disabled={!isSubmitEnabled || loading}
            className={clsx(
              "px-6 py-3 rounded-full font-semibold transition",
              isSubmitEnabled
                ? "bg-yellow-600 hover:bg-yellow-500 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed",
            )}
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex justify-center">
                {" "}
                <Loader2 className="animate-spin w-4 h-4" />
              </div>
            ) : (
              " Submit Checkin"
            )}
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmoji && (
          <div className="mt-4 absolute bottom-20 left-20">
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
