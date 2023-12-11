'use client';

import { updateUser } from '@/actions/updateUser';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
import ImageUpload from '../upload/ImageUpload';

const formSchema = z.object({
  picture: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

const ProfileModal = () => {
  const router = useRouter();

  const [isActive, setActive] = useState<boolean>(false);

  const { type, isOpen, data, onClose } = useModal();

  const isModalOpen = isOpen && type === 'profile';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      picture: '',
      currentPassword: '',
      newPassword: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.currentPassword) {
        if (values.currentPassword.length < 8) {
          toast.error('Current password must be minimum eight digit required!');
        }
      }

      if (values.newPassword) {
        if (values.newPassword.length < 8) {
          toast.error('New password must be minimum eight digit required!');
        }
      }

      const newValues = {
        userId: data.id,
        ...values,
      };

      const res = await updateUser(newValues);

      toast.success(res);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ['playlists'] });

      onClose();

      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (data) {
      form.setValue('picture', data.picture);
    }
  }, [data, form]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div>
          <h1 className='text-4xl text-center font-bold capitalize'>
            Hello{' '}
            <span className='text-emerald-500 uppercase'>{data?.username}</span>
            !
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='picture'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <ImageUpload
                      type='profile'
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              className='w-full'
              onClick={() => setActive((prev) => !prev)}
            >
              {isActive ? (
                <p className='font-bold'>Close</p>
              ) : (
                <p className='font-bold'>Change Password</p>
              )}
            </Button>
            {isActive && (
              <>
                <FormField
                  control={form.control}
                  name='currentPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Current Password'
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
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='New Password'
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
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

export default memo(ProfileModal);
