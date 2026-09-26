export async function getCategories() {

    const res = await fetch(
        "http://127.0.0.1:8000/api/categories/",
        {
            cache: "no-store"
        }
    );


    if (!res.ok) {

        throw new Error(
            "Failed to fetch categories"
        );

    }


    return res.json();

}