'use client';

import { getPlaylists } from '@/actions/getPlaylists';
import { postSong } from '@/actions/postSong';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import * as z from 'zod';
import { queryClient } from '../providers/query-provider';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  playlistId: z.string().min(1, {
    message: 'Playlist must be required!',
  }),
  title: z.string().min(1, {
    message: 'Title must be required!',
  }),
  description: z.string().optional(),
  author: z.string().min(1, {
    message: 'Author must be required!',
  }),
  thumbnail: z.string().optional(),
  audio: z.string().min(1, {
    message: 'Audio must be required!',
  }),
});

const AddSongModal = () => {
  const router = useRouter();

  const { type, isOpen, onClose } = useModal();

  const isModalOpen = isOpen && type === 'addSong';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      thumbnail: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['playlists'],
    queryFn: getPlaylists,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await postSong(values);

      toast.success(res);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ['songs'] });

      onClose();

      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!isModalOpen) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='h-full overflow-y-auto scrollbar-hide'>
        <DialogHeader>
          <DialogTitle>Add Song</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='playlistId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a playlist' />
                      </SelectTrigger>
                      <SelectContent position='item-aligned'>
                        {!!data?.playlists.length &&
                          data.playlists.map(
                            (playlist: { id: string; name: string }) => (
                              <SelectItem
                                key={playlist.id}
                                className='capitalize'
                                value={playlist.id}
                              >
                                {playlist.name}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Title'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Description'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='author'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Author'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='thumbnail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Thumbnail'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='audio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Audio'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='secondary'
              disabled={!isValid || isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AddSongModal);
