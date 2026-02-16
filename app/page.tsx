export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to dummy.</h1>
        <p className="text-gray-600 mb-8">Your BNPL checkout is ready</p>
        <a
          href="/checkout"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Checkout
        </a>
      </div>
    </div>
  );
}
