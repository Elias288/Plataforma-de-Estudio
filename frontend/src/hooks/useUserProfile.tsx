import api from '@/api/client';
import { useAuth } from '@/context/AuthContext';
import type { User } from '@/types/User.type';
import { useEffect, useState } from 'react';

export function useUserProfile() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get<User>('/auth/userInfo');
        setPerfil(res.data);
      } catch (error: any) {
        console.error(error);
        setError('Error al obtener el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { perfil, loading, error };
}
