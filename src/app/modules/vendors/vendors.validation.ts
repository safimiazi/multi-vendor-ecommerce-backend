import { z } from 'zod';
    
    export const vendorsPostValidation = z.object({
      
      user: z.string().optional(),
      shopName: z.string().optional(),
      logo: z.string().optional(),
      shopAddress: z.string().optional(),
      shopPhone: z.string().optional(),
      shopEmail: z.string().email().optional(),
      description: z.string().optional(),
      isVarified: z.boolean().optional(),
      isDelete: z.boolean().optional(),
      isActive: z.boolean().optional(),
      reating: z.number().optional(),
   
    });
    
    
    export const vendorsUpdateValidation = vendorsPostValidation.partial();
    