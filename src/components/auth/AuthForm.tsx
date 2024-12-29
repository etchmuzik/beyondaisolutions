import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Terminal, Lock, Mail } from 'lucide-react';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg border border-cyan-500/20">
        <div className="flex justify-center">
          <Terminal className="h-12 w-12 text-cyan-400" />
        </div>
        
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              isLogin ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Initialize Login
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              !isLogin ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'
            }`}
            onClick={() => setIsLogin(false)}
          >
            New Instance
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Lock className="h-4 w-4 mr-2 text-gray-400" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 text-black font-medium py-2 px-4 rounded-md hover:bg-cyan-400 transition-colors"
          >
            {isLogin ? 'Initialize Login' : 'Create Instance'}
          </button>
        </form>
      </div>
    </div>
  );
}