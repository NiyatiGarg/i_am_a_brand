'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export function AnimatedBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: false,
          },
        },
      },
      particles: {
        number: {
          value: prefersReducedMotion ? 10 : 35,
        },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.3,
        },
        move: {
          enable: !prefersReducedMotion,
          speed: 1,
        },
        opacity: {
          value: 0.4,
        },
        size: {
          value: 2,
        },
        color: {
          value: '#ff6b35',
        },
      },
      detectRetina: true,
    }),
    [prefersReducedMotion],
  );

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  );
}

