import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Para imagens críticas (hero, above fold)
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Se for priority, carrega imediatamente
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Função para gerar URLs WebP com fallback inteligente
  const getOptimizedSrc = (originalSrc: string) => {
    // Se já for WebP, retorna como está
    if (originalSrc.includes('.webp')) {
      return originalSrc;
    }
    
    // Para imagens de depoimentos, usa JPG original
    if (originalSrc.includes('/testimonials/')) {
      return originalSrc;
    }
    
    // Para outras imagens, tenta WebP
    const webpSrc = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return webpSrc;
  };

  const getFallbackSrc = (originalSrc: string) => {
    // Se for WebP, tenta encontrar PNG/JPG equivalente
    if (originalSrc.includes('.webp')) {
      return originalSrc.replace('.webp', '.jpg').replace('.webp', '.png');
    }
    return originalSrc;
  };

  // Função para determinar se deve usar WebP
  const shouldUseWebP = (originalSrc: string) => {
    // Não usa WebP para imagens de depoimentos (não temos versões WebP)
    if (originalSrc.includes('/testimonials/')) {
      return false;
    }
    // Para outras imagens, usa WebP se disponível
    return true;
  };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Carrega 50px antes de entrar na viewport
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Se não está na viewport ainda, mostra placeholder
  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-slate-200 dark:bg-slate-700 animate-pulse ${className}`}
        style={{ width, height }}
        aria-label={`Carregando ${alt}`}
      >
        {placeholder && (
          <div className="flex items-center justify-center h-full text-slate-400">
            {placeholder}
          </div>
        )}
      </div>
    );
  }

  return (
    <picture className={className}>
      {/* WebP source apenas se deve usar WebP */}
      {shouldUseWebP(src) && (
        <source
          srcSet={getOptimizedSrc(src)}
          type="image/webp"
        />
      )}
      
      {/* Fallback para navegadores que não suportam WebP ou imagem original */}
      <img
        ref={imgRef}
        src={hasError ? getFallbackSrc(src) : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          ...(width && { width }),
          ...(height && { height })
        }}
      />
    </picture>
  );
};

export default OptimizedImage;