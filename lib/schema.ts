import { z } from "zod";

// Zod schema for Contact form validation on client and server.
export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  product: z.string().optional(),
  supportType: z.string().optional(),
  orderId: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
