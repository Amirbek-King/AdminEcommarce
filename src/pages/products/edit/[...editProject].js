import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductForm from '../../components/ProductForm'; // Adjust the import path as needed
import Layout from '../../components/Layout'; // Adjust the import path as needed

export default function EditProduct() {
    const [productInfo, setProductInfo] = useState({});
    const router = useRouter();
    const { editProject } = router.query; // Destructure editProject from query

    useEffect(() => {
        if (!editProject || editProject.length === 0) {
            console.log("No id found in router query");
            return;
        }
        const id = editProject[0];
        console.log(id)
        axios.get('/api/products?id=' + id)
            .then(response => {
                setProductInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [editProject]);

    return (
        <Layout>
            <h1 className=" mb-2 text-xl">Edit Product</h1>
            {productInfo && <ProductForm {...productInfo} />}
        </Layout>
    );
}
