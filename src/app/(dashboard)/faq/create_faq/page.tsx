'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useCreateFaq } from '@/hooks/faq/useFaQ';
import { CreateFaQItem } from '@/types/types';
import { useRouter } from 'next/navigation';
import Heading from '@/components/heading/Heading';
const formSchema = z.object({
  question: z.string().min(10, {
    message: 'Question must be at least 10 characters.',
  }),
  answer: z.string().min(20, {
    message: 'Answer must be at least 20 characters.',
  }),
  status: z.string().optional(),
});

export default function CreateFAQ() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('edit');
  const { mutate: createFaq } = useCreateFaq();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      answer: '',
      status: 'hide',
    },
  });

  function onSubmit(
    values: z.infer<typeof formSchema>,
    status: 'hide' | 'show'
  ) {
    setIsSubmitting(true);
    try {
      // Create a blog item object matching the CreateBlogItem type
      const faqData: CreateFaQItem = {
        question: values.question,
        answer: values.answer,
        status: status,
      };
      createFaq(faqData, {
        onSuccess: () => {
          router.push('/faq');
        },
        onError: (error: any) => {
          console.error('Error creating faq:', error);
          form.setError('root', {
            type: 'manual',
            message: error.message || 'Failed to create faq. Please try again.',
          });
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Create FAQ</h1>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <Heading
                name="FAQ Details"
                desc="  Add a new frequently asked question to your knowledge base."
              />
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) =>
                    onSubmit(values, 'show')
                  )}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g., How do I reset my password?"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setActiveTab('edit');
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Write the question as it would be asked by a user.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a clear, concise answer..."
                            className="min-h-[200px]"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setActiveTab('edit');
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          You can use plain text formatting. Keep answers
                          concise and helpful.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <CardFooter className="flex justify-between gap-4 px-0">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const values = form.getValues();
                          onSubmit(values, 'hide'); // Set status to 'draft'
                        }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : 'Save as Draft'}
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isSubmitting ? 'Creating...' : 'Create FaQ'}
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview & Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="edit"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Tips for good FAQs:
                      </h3>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                        <li>Keep questions concise and specific</li>
                        <li>
                          Use natural language that users would actually use
                        </li>
                        <li>Provide complete answers that solve the problem</li>
                        <li>
                          Include relevant links or next steps when applicable
                        </li>
                        <li>Group related FAQs together</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">
                        {form.watch('question') ||
                          'Question preview will appear here'}
                      </h3>
                      <div className="text-sm whitespace-pre-wrap">
                        {form.watch('answer') ||
                          'Answer preview will appear here'}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    This is how your FAQ will appear to users in the knowledge
                    base.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="w-full">
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      form.formState.isValid ? 'bg-green-500' : 'bg-amber-500'
                    }`}
                  ></div>
                  <span className="text-sm text-muted-foreground">
                    {form.formState.isValid ? 'Ready to publish' : 'Incomplete'}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
