import { supabase } from './supabaseClient';

export const defaultCategories = [
  { id: 'aniversario_feminino', name: 'aniversario feminino' },
  { id: 'aniversario_masculino', name: 'Aniversário masculino' }
];

const defaultCategoryIds = defaultCategories.map((category) => category.id);

export async function seedDatabaseIfNeeded() {
  try {
    console.log('Seeding/updating database references and categories...');

    const { error: catInsertError } = await supabase
      .from('categories')
      .upsert(defaultCategories);

    if (catInsertError) console.error('Error seeding categories:', catInsertError);

    const { data: categoryRows, error: categoriesLookupError } = await supabase
      .from('categories')
      .select('id');

    if (categoriesLookupError) {
      console.error('Error looking up categories:', categoriesLookupError);
    } else {
      const categoriesToRemove = (categoryRows || [])
        .filter((category) => !defaultCategoryIds.includes(category.id))
        .map((category) => category.id);

      if (categoriesToRemove.length > 0) {
        const { error: categoriesDeleteError } = await supabase
          .from('categories')
          .delete()
          .in('id', categoriesToRemove);

        if (categoriesDeleteError) console.error('Error deleting stale categories:', categoriesDeleteError);
      }
    }

    const { data: refsToRemove, error: refsLookupError } = await supabase
      .from('references')
      .select('id, url')
      .or('category.eq.Landpage,url.like.assets.%');

    if (refsLookupError) {
      console.error('Error looking up non-storage references:', refsLookupError);
    } else if ((refsToRemove || []).length > 0) {
      const { error: refsDeleteError } = await supabase
        .from('references')
        .delete()
        .in('id', refsToRemove.map((ref) => ref.id));

      if (refsDeleteError) console.error('Error deleting non-storage references:', refsDeleteError);
    }

    console.log('Database sync completed successfully!');
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
}
