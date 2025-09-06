import React from 'react'

import { CategoryList, PageLayout } from '../components'
import { useStore } from '../context/StoreContext'

export const SettingsPage: React.FC = () => {
    const { expenseCategoryStore, expenseStore } = useStore()

    return (
        <PageLayout title="Settings">
            <CategoryList
                categories={expenseCategoryStore.categories}
                onCategoryAdd={(label) => expenseCategoryStore.add(label)}
                onCategoryEdit={(id, newLabel) =>
                    expenseCategoryStore.rename(id, newLabel)
                }
                onCategoryDelete={async (id) => {
                    await expenseStore.resetCategory(id)
                    await expenseCategoryStore.remove(id)
                }}
            />
        </PageLayout>
    )
}
