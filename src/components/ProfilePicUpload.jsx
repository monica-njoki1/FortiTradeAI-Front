import React, { useRef, useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import { authApi } from "../api/client";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function ProfilePicUpload({ user, onUpdate }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image or GIF file");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Image too large — keep it under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      setUploading(true);
      try {
        const res = await authApi.updateProfilePic(reader.result);
        onUpdate(res.data.user);
      } catch (err) {
        setError(err.response?.data?.error || "Upload failed");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    setUploading(true);
    try {
      const res = await authApi.deleteProfilePic();
      onUpdate(res.data.user);
    } catch (err) {
      setError("Failed to remove picture");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-24 h-24 rounded-full border-2 border-forti-cyan/50 overflow-hidden bg-forti-black flex items-center justify-center cursor-pointer group"
        style={{ boxShadow: "0 0 20px rgba(56,189,248,0.35)" }}
        onClick={() => fileInputRef.current?.click()}
      >
        {user?.profile_pic ? (
          <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <Camera className="text-forti-cyan/50" size={28} />
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Camera className="text-forti-cyan" size={20} />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-3 text-xs">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="text-forti-cyan/70 hover:text-forti-cyan transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Change photo"}
        </button>
        {user?.profile_pic && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="text-forti-danger/70 hover:text-forti-danger transition flex items-center gap-1"
          >
            <Trash2 size={12} /> Remove
          </button>
        )}
      </div>

      {error && <p className="text-forti-danger text-xs">{error}</p>}
    </div>
  );
}