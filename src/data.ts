export type Category = {
  id: string;
  nameKh: string;
};

export type Product = {
  id: string;
  nameKh: string;
  categoryId: string;
  price: number;
  image: string;
  tag?: string;
};

export const categories: Category[] = [
  { id: "all", nameKh: "ទាំងអស់" },
  { id: "tea", nameKh: "គេសជ្ជៈប្រភេទតែ" },
  { id: "coffee", nameKh: "គេសជ្ជៈកាហ្វេ" },
  { id: "ice", nameKh: "គេសជ្ជៈក្រឡុក" },
  { id: "juice", nameKh: "គេសជ្ជៈផ្លែឈើ" },
  { id: "snack", nameKh: "អាហារសម្រន់" },
];

// All products use the local "coming soon" placeholder image.
import comingSoon from "./assets/coming-soon.jpg";

export const products: Product[] = [
  { id: "p1", nameKh: "តែក្រូចហាមទឹកដោះគោ", categoryId: "tea", price: 6000, image: comingSoon, tag: "Multiple Toppings" },
  { id: "p2", nameKh: "តែបៃតងក្រូចឆ្មា", categoryId: "tea", price: 6000, image: comingSoon, tag: "Multiple Toppings" },
  { id: "p3", nameKh: "តែម៉ាចាបៃតង", categoryId: "tea", price: 6500, image: comingSoon, tag: "Multiple Toppings" },
  { id: "p4", nameKh: "តែថៃទឹកដោះគោ", categoryId: "tea", price: 6000, image: comingSoon, tag: "Multiple Toppings" },
  { id: "p5", nameKh: "កាហ្វេអេស្ព្រេសសូ", categoryId: "coffee", price: 6000, image: comingSoon },
  { id: "p6", nameKh: "កាហ្វេឡាតេ", categoryId: "coffee", price: 6500, image: comingSoon },
  { id: "p7", nameKh: "កាហ្វេម៉ូកា", categoryId: "coffee", price: 7000, image: comingSoon },
  { id: "p8", nameKh: "កាហ្វេអាមេរីកាណូ", categoryId: "coffee", price: 5500, image: comingSoon },
  { id: "p9", nameKh: "ប៉ិកក្រឡុកស្ត្របឺរី", categoryId: "ice", price: 7000, image: comingSoon },
  { id: "p10", nameKh: "ក្រឡុកម៉ង្គូតៅ", categoryId: "ice", price: 7000, image: comingSoon },
  { id: "p11", nameKh: "ក្រឡុកចេក ", categoryId: "ice", price: 6500, image: comingSoon },
  { id: "p12", nameKh: "ទឹកក្រូចឆ្មាត្រជាក់", categoryId: "juice", price: 5000, image: comingSoon },
  { id: "p13", nameKh: "នំបុ័ងប៊ឺរខៀវ", categoryId: "snack", price: 4000, image: comingSoon },
];

export type Option = { id: string; label: string; price: number };

export const optionGroups: { title: string; multi: boolean; options: Option[] }[] = [
  {
    title: "បន្ថែម",
    multi: true,
    options: [
      { id: "extra-shot", label: "តូច", price: 1000 },
      { id: "extra-large", label: "ត្រឹម", price: 1000 },
    ],
  },
  {
    title: "ស្ករ",
    multi: false,
    options: [
      { id: "s0", label: "ស្ករ 0%", price: 0 },
      { id: "s25", label: "ស្ករ 25%", price: 0 },
      { id: "s50", label: "ស្ករ 50%", price: 0 },
      { id: "s75", label: "ស្ករ 75%", price: 0 },
      { id: "s100", label: "ស្ករ 100%", price: 0 },
    ],
  },
  {
    title: "ទឹកកក",
    multi: false,
    options: [
      { id: "ice-none", label: "ទឹកកកច្រើន", price: 0 },
      { id: "ice-lite", label: "ទឹកកកតិច", price: 0 },
      { id: "ice-normal", label: "ទឹកកកធម្មតា", price: 0 },
    ],
  },
];

export const formatPrice = (n: number) =>
  `៛ ${n.toLocaleString("en-US")}`;
