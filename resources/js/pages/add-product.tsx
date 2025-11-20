import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Circle, Dot, PlusCircle } from 'lucide-react';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, ImageIcon } from "lucide-react"
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { toast } from "sonner"
import InputError from '@/components/input-error';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/products',
    },
    {
        title: 'Add Product',
        href: '/products/create',
    },
];


export default function AddProduct() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
        stock: '',
        image: null as File | null,
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post('/products', {
            onError: () => {
                toast.error("Failed to create product");
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Product" />
            <form onSubmit={handleSubmit}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 max-w-6xl w-full mx-auto">
                
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <Button asChild className='aspect-square' size="sm">
                            <Link href="/products">
                                <ChevronLeft/>
                            </Link>
                        </Button>
                        
                        <h1 className='text-2xl font-bold'>Add Product</h1>
                    </div>
                    <div className='space-x-2'>
                 
                        <Button variant="destructive">
                            <Link href="/products">
                                Discard
                            </Link>
                            </Button>
            
                        <Button variant="default" type='submit' disabled={processing}>
                            Create
                        </Button>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2 space-y-4'>
                        <Card className='p-4'>
                            <FieldSet>
                                <FieldLegend>Product Details</FieldLegend>
                                <FieldDescription>
                                We need your address to deliver your order.
                                </FieldDescription>
                                <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input 
                                        id="name" 
                                        type="text" 
                                        placeholder="123 Main St" 
                                        value={data.name} 
                                        onChange={(e) => setData('name', e.target.value)}/>
                                    <InputError message={errors.name} />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor='description'>Description</FieldLabel>
                                    <Textarea 
                                        id="description"
                                        placeholder='product description'
                                        value={data.description} 
                                        onChange={(e) => setData('description', e.target.value)}
                                        />
                                    <InputError message={errors.description} />
                                    <FieldDescription>
                                        Set a description to the product for better visibility.
                                    </FieldDescription>
                                    
                                </Field>
                                </FieldGroup>
                            </FieldSet>
                        </Card>
                        <Card className='p-4'>
                            <FieldSet>
                                <div className='flex items-center justify-between'>
                                    <FieldLegend>Product Images</FieldLegend>
                                    <Button variant="link">Add media from URL</Button>
                                </div>
                                <Label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center border border-dashed border-zinc-700 rounded-lg p-6 text-center cursor-pointer"
                                >
                                <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-sm text-gray-600">Drop your image here</p>
                                <p className="text-xs text-gray-400 mb-4">PNG or JPG (max. 5MB)</p>

                                {/* Button now just triggers the file input */}
                                <Button asChild type="button" variant="outline" className="flex items-center gap-2">
                                    <span>
                                    <Upload className="w-4 h-4" />
                                    Select image
                                    </span>
                                </Button>

                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    className="hidden"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                />
                                </Label>
                                {data.image && (
  <div className="mt-2 text-sm text-gray-700">
    Selected file: <span className="font-medium">{data.image.name}</span>
  </div>
)}


                            </FieldSet>
                        </Card>
                    </div>
                    <div className='space-y-4'>
                        <Card className='p-4'>
                            <FieldSet>
                                <FieldLegend className='mb-4'>Pricing</FieldLegend>
                                
                                <Field>
                                    <FieldLabel htmlFor='price'>Price</FieldLabel>
                                    <Input 
                                        id="price"
                                        type='number'
                                        placeholder='$100.00'
                                        value={data.price} 
                                        onChange={(e) => setData('price', e.target.value)}
                                        />
                                    <InputError message={errors.price} />
                                </Field>
                                <Separator/>
                                
                                <Field>
                                    <FieldLabel htmlFor='stock'>Stock</FieldLabel>
                                        <Input 
                                            id='stock'
                                            placeholder='number of stock' 
                                            type='number' 
                                            value={data.stock}
                                            onChange={(e) => setData('stock', e.target.value)}
                                        />
                                        <InputError message={errors.stock} />
                                </Field>
                            </FieldSet>
                        </Card>
                    </div>
                
                    
                    
                </div>
                
            </div>
            </form>
        </AppLayout>
    );
}
