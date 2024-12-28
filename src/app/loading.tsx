import './globals.css';
import './loading.css';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex max-w-xs items-center space-x-4 p-4">
        <span className="loader"></span>
      </div>
      <div className="ml-10 flex flex-col text-center">
        <span className="font-semibold text-gray-800">¡ Sea paciente !</span>
        <span className="text-sm text-gray-500">No tardará mucho...</span>
      </div>
    </div>
  );
}
