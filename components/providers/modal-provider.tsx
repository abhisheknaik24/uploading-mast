'use client';

import { useEffect, useState } from 'react';
import AddPlaylistModal from '../modals/add-playlist-modal';
import AddSongModal from '../modals/add-song-modal';
import ProfileModal from '../modals/profile-modal';
import SignInModal from '../modals/sign-in-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      <ProfileModal />
      <AddPlaylistModal />
      <AddSongModal />
    </>
  );
};
