import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideInstagram, LucideFacebook, LucideX, LucideLinkedin, LucideSparkles } from 'lucide-react';

const postgeneration = () => {
    // State to manage user inputs and selected platform
    const [logoUrl, setLogoUrl] = useState('https://placehold.co/200x200/5B21B6/white?text=Logo');
    const [brandName, setBrandName] = useState('BrandCraft');
    const [brandColor, setBrandColor] = useState('#5B21B6');
    const [userPrompt, setUserPrompt] = useState('A professional, stylish, and minimal visual.');
    const [selectedPlatform, setSelectedPlatform] = useState('instagram_post');
    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    // References to the canvas elements for drawing
    const profileCanvasRef = useRef(null);
    const bannerCanvasRef = useRef(null);
    const postCanvasRef = useRef(null);

    // Social media platform dimensions
    const platforms = {
        instagram: {
            profile: { width: 1080, height: 1080, name: "Instagram Profile" },
            banner: null,
        },
        instagram_post: {
            post: { width: 1080, height: 1080, name: "Instagram Post" },
            banner: null,
        },
        facebook: {
            profile: { width: 1080, height: 1080, name: "Facebook Profile" },
            banner: { width: 851, height: 315, name: "Facebook Banner" },
        },
        twitter: {
            profile: { width: 400, height: 400, name: "X/Twitter Profile" },
            banner: { width: 1500, height: 500, name: "X/Twitter Banner" },
        },
        linkedin: {
            profile: { width: 400, height: 400, name: "LinkedIn Profile" },
            banner: { width: 1584, height: 396, name: "LinkedIn Banner" },
        },
    };

    /**
     * Generates an AI image using the Gemini API based on the user's prompt.
     */
    const generateImage = async () => {
        if (!userPrompt.trim()) {
            setError("Please enter a description for the image.");
            return;
        }

        setIsGenerating(true);
        setGeneratedImageUrl(null);
        setError(null);

        const prompt = `${userPrompt}. A high-quality creative image for the brand ${brandName}.`;
        const payload = {
            instances: { prompt: prompt },
            parameters: { "sampleCount": 1 }
        };

        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

        let retries = 0;
        const maxRetries = 5;
        const baseDelay = 1000;

        const callApi = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }

                const result = await response.json();
                if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                    const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
                    setGeneratedImageUrl(imageUrl);
                } else {
                    throw new Error("Invalid API response format");
                }
            } catch (e) {
                console.error("Error generating image:", e);
                if (retries < maxRetries) {
                    retries++;
                    const delay = baseDelay * (2 ** retries);
                    console.log(`Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    await callApi();
                } else {
                    setError("Failed to generate image after multiple retries. Please try again later.");
                }
            }
        };
        await callApi();
        setIsGenerating(false);
    };

    // Main drawing logic for a profile or banner image
    const drawProfileOrBanner = (canvas, dimensions, logo, name) => {
        const ctx = canvas.getContext('2d');
        const { width, height } = dimensions;

        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = brandColor;
        ctx.fillRect(0, 0, width, height);

        const logoImage = new Image();
        logoImage.crossOrigin = 'anonymous';
        logoImage.src = logo;

        logoImage.onload = () => {
            const logoSize = Math.min(width, height) * 0.6;
            const x = (width - logoSize) / 2;
            const y = (height - logoSize) / 2;
            ctx.drawImage(logoImage, x, y, logoSize, logoSize);

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `bold ${Math.min(width, height) / 10}px Inter, sans-serif`;
            ctx.fillText(name, width / 2, height - (height / 10));
        };
    };

    // Drawing logic for the Instagram post with AI image and watermark
    const drawPostWithWatermark = (canvas, dimensions, logo, name, postImage) => {
        const ctx = canvas.getContext('2d');
        const { width, height } = dimensions;

        canvas.width = width;
        canvas.height = height;
        
        // Use a placeholder if no AI image is generated yet
        if (!postImage) {
            ctx.fillStyle = brandColor;
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `bold ${width / 12}px Inter, sans-serif`;
            ctx.fillText("Generate an image first!", width / 2, height / 2);
            return;
        }

        const backgroundImage = new Image();
        backgroundImage.onload = () => {
            // Draw the AI-generated image as the background
            ctx.drawImage(backgroundImage, 0, 0, width, height);

            // Draw the logo as a watermark in the bottom-right corner
            const logoImage = new Image();
            logoImage.crossOrigin = 'anonymous';
            logoImage.src = logo;

            logoImage.onload = () => {
                const logoSize = width * 0.2;
                const padding = 20;
                const x = width - logoSize - padding;
                const y = height - logoSize - padding;

                ctx.globalAlpha = 0.5;
                ctx.drawImage(logoImage, x, y, logoSize, logoSize);
                ctx.globalAlpha = 1.0;
            };
        };
        backgroundImage.src = postImage;
    };

    // Effect to redraw canvases whenever inputs or platform change
    useEffect(() => {
        const profileDims = platforms[selectedPlatform]?.profile;
        if (profileCanvasRef.current && profileDims) {
            drawProfileOrBanner(profileCanvasRef.current, profileDims, logoUrl, brandName);
        }

        const bannerDims = platforms[selectedPlatform]?.banner;
        if (bannerCanvasRef.current && bannerDims) {
            drawProfileOrBanner(bannerCanvasRef.current, bannerDims, logoUrl, brandName);
        }
        
        const postDims = platforms[selectedPlatform]?.post;
        if (postCanvasRef.current && postDims) {
            drawPostWithWatermark(postCanvasRef.current, postDims, logoUrl, brandName, generatedImageUrl);
        }
    }, [selectedPlatform, logoUrl, brandName, brandColor, generatedImageUrl]);

    const downloadImage = (canvasRef, filename) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
                .custom-file-input::-webkit-file-upload-button {
                    visibility: hidden;
                }
                .custom-file-input::before {
                    content: 'Upload Logo';
                    display: inline-block;
                    background: ${brandColor};
                    color: white;
                    border-radius: 9999px;
                    padding: 8px 16px;
                    outline: none;
                    white-space: nowrap;
                    -webkit-user-select: none;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 1rem;
                    transition: all 0.2s;
                }
                .custom-file-input:hover::before {
                    background: color-mix(in srgb, ${brandColor}, black 15%);
                }
                .custom-file-input:active::before {
                    transform: scale(0.95);
                }
                `}
            </style>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        Social Brand Kit Generator
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Create social media assets for your brand instantly.
                    </p>
                </motion.div>

                {/* Input and controls section */}
                <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="flex flex-col items-center md:items-start">
                            <label className="text-sm font-medium text-gray-700">Logo</label>
                            <img src={logoUrl} alt="Current Logo" className="mt-2 w-24 h-24 rounded-full border-4 border-gray-200 object-contain" />
                            <input
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setLogoUrl(URL.createObjectURL(e.target.files[0]));
                                    }
                                }}
                                className="mt-4 custom-file-input"
                            />
                        </div>
                        <div>
                            <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">Brand Name</label>
                            <input
                                type="text"
                                id="brandName"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="brandColor" className="block text-sm font-medium text-gray-700">Brand Color</label>
                            <input
                                type="color"
                                id="brandColor"
                                value={brandColor}
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Platform selection and AI image generation */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Select an Asset Type</h2>
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                        {Object.keys(platforms).map(platform => (
                            <motion.button
                                key={platform}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedPlatform(platform)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all shadow-md
                                    ${selectedPlatform === platform ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                {platform.includes('instagram') && <LucideInstagram size={20} />}
                                {platform === 'facebook' && <LucideFacebook size={20} />}
                                {platform === 'twitter' && <LucideX size={20} />}
                                {platform === 'linkedin' && <LucideLinkedin size={20} />}
                                <span>{platforms[platform].profile?.name || platforms[platform].post?.name || platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* AI Image Generation Prompt and Button */}
                    {selectedPlatform === 'instagram_post' && (
                        <div className="mt-8 space-y-4">
                            <textarea
                                value={userPrompt}
                                onChange={(e) => setUserPrompt(e.target.value)}
                                placeholder="e.g., 'A vibrant abstract painting with flowing gold lines.'"
                                rows="3"
                                className="w-full max-w-2xl mx-auto block rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                            ></textarea>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={generateImage}
                                disabled={isGenerating}
                                className="flex items-center space-x-2 px-6 py-3 mx-auto bg-green-500 text-white rounded-full font-semibold shadow-md hover:bg-green-600 transition disabled:bg-green-300"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Generating...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <LucideSparkles size={20} />
                                        <span>Generate AI Image</span>
                                    </span>
                                )}
                            </motion.button>
                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                        </div>
                    )}
                </div>

                {/* Generated assets display */}
                {selectedPlatform && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        {platforms[selectedPlatform].profile && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    {platforms[selectedPlatform].profile?.name}
                                </h3>
                                <div className="w-64 h-64 border border-gray-300 rounded-lg overflow-hidden">
                                    <canvas ref={profileCanvasRef} className="w-full h-full object-contain"></canvas>
                                </div>
                                <button
                                    onClick={() => downloadImage(profileCanvasRef, `${brandName}_${selectedPlatform}_profile.png`)}
                                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition"
                                >
                                    Download Profile
                                </button>
                            </motion.div>
                        )}
                        
                        {platforms[selectedPlatform].post && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    {platforms[selectedPlatform].post?.name}
                                </h3>
                                <div className="w-64 h-64 border border-gray-300 rounded-lg overflow-hidden">
                                    <canvas ref={postCanvasRef} className="w-full h-full object-contain"></canvas>
                                </div>
                                <button
                                    onClick={() => downloadImage(postCanvasRef, `${brandName}_${selectedPlatform}_post.png`)}
                                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition"
                                >
                                    Download Post
                                </button>
                            </motion.div>
                        )}

                        {platforms[selectedPlatform].banner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    {platforms[selectedPlatform].banner.name}
                                </h3>
                                <div className="w-full max-w-lg overflow-hidden rounded-lg border border-gray-300">
                                    <canvas ref={bannerCanvasRef} className="w-full h-full object-contain"></canvas>
                                </div>
                                <button
                                    onClick={() => downloadImage(bannerCanvasRef, `${brandName}_${selectedPlatform}_banner.png`)}
                                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition"
                                >
                                    Download Banner
                                </button>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default postgeneration;