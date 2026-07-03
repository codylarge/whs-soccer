import PhotoGallery from '@/components/PhotoGallery';

export default function GalleryPage() {
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-2 text-center">
        <p className="text-green-600 text-xs font-bold uppercase tracking-[0.4em] mb-3">
          Action Shots
        </p>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
          Photo Gallery
        </h1>
      </div>
      <PhotoGallery />
    </main>
  );
}
