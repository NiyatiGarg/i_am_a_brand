import type { Metadata } from 'next';
import { Card } from '@/components/Card';

export const metadata: Metadata = {
  title: 'Dance & Music | Niyati Garg',
  description: 'My creative journey in dance and music',
};

export default function DanceMusicPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">Dance & Music</h1>

        {/* Creative Bio */}
        <section className="max-w-4xl mx-auto mb-12">
          <Card>
            <h2 className="text-3xl font-bold mb-4">Creative Expression</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dance and music have always been my outlets for creative expression. Through movement and
              melody, I find a way to communicate emotions and stories that words alone cannot capture.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether I'm choreographing a new routine or covering a favorite song, these art forms allow me
              to explore different facets of my personality and connect with others on a deeper level.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This space showcases my journey in dance and music - from practice sessions to performances,
              from covers to original compositions. It's a celebration of creativity, passion, and the joy
              that comes from expressing oneself authentically.
            </p>
          </Card>
        </section>

        {/* Instagram Embeds */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Dance Performances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Instagram Embed {i}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Embeds */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Music Covers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[1, 2].map((i) => (
              <Card key={i}>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Video Embed {i}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

