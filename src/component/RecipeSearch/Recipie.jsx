import axios from 'axios';
import './Recipe3.css';
import { InfinitySpin } from 'react-loader-spinner';
import React, { useContext, useEffect, useState } from 'react';
import Slideshow from '../Restaurants/SLIDESHOW';
import { UserContext } from '../ContextAPI/Context';
import { useNavigate } from 'react-router-dom';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set the number of items per page

    const appId1 = '6e007eb3';
    const appKey1 = 'f3a121ff5fda598762c1c91c9295dd2a';

    useEffect(() => {
        if (query) {
            setLoading(true);
            setError('');
            axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId1}&app_key=${appKey1}`)
                .then((response) => {
                    if (response.data.hits.length === 0) {
                        setError('No recipes found.');
                    }
                    setRecipes(response.data.hits || []);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error.response?.status, error.response?.data);
                    setError('Error fetching data, please try again later.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.query.value.trim();
        if (searchQuery) {
            setQuery(searchQuery);
            setCurrentPage(1); // Reset to the first page on a new search
        }
    };


    const { addToFavorites, nutritionAnalysis } = useContext(UserContext);
    const navigate = useNavigate();

    const handleingredientNutritionsAnalysis = (recipe) => {
        nutritionAnalysis(recipe);
        navigate('/nutrition-analysis');
    };
    const handleAddToFavorite = (recipe) => {
        addToFavorites(recipe);
        console.log('Adding recipe to favorite:', recipe);
    };

    // Pagination Logic
    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const trendingRecipes = [
        {
            id: 1,
            label: "Spaghetti Carbonara",
            image: "https://edamam-product-images.s3.amazonaws.com/web-img/066/066b847fe1198582786bd20c83afd030.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQD%2BZDMuQgCnC1z6GTyFvCFj5RWC%2FtJNsDSBu%2F5HAMrAGwIhAP9%2FLcjS3ikQbWEmpunKxGDIWb7JM6E5sU6Po5b3IuttKrkFCDIQABoMMTg3MDE3MTUwOTg2IgypnSfdNyf2wx7Cq9AqlgVsgrpTM6nx3pCcjjk9dkYRELtOYr88juDy%2FHQE94WEKF69U%2FYGu3HkHNqk7qUQ%2B7d7SEl8Jxwmh2EEW%2F3c8LvK9byhV6Vvz92UISiRTpci0p0ZNNgrtSln48KY6R5WeNM3qf%2BTQUuHnfQcepW1ufgBjpTe7sFKxitPegSvsyJj7s8%2Bjl15JAO9zIpHy3cS2PK6HM%2BdwjwNtqlGvKvfc9ig5IgRdR4jcWuojNu9hp64yuXmYJOeWiik8hs469Fq9ccpGOWU0fWJkXlo99jaib62OaOAHioN6mQTJvErsm74WcgPixSs3Ys3WmS9A4GhdDvKk1WUyPAvCzjmCcB81v%2FmhGQrcwprr0qEq8Ql9lJx4QVEDuokVqQRpFNH0tjDy5F85YnF%2Bwc00uKGl%2FB69JH79cBCK6b3DtEYczq9EDvFW9Nl0Y8xDB%2BDOf2tfsXctLjIoWHTJtkKeMiWZ0qe3sm0Yz%2BZPjEAfMGts5Rd30egTN7eDSropjsZwGtn3mL4yb4SQR29Wr%2BZwc9O0qNXamDhmNz7%2FKpo93FqBhB4TjDtSOJZB31E4t5VU9yjjxvhWthswcWhbzI9xFBlyn1L5DjkmI9qlZp%2FnZQOLIyFn9thW5geHKrK24PVHtF4h0QXQGJFpnoim0WQDYlJexJGu0n9hzzlmNHeugHrP2TFYomvgtt8OCX%2BvUX0rIh38Lwxwoy%2Fk4yVseeOzXeWRozh%2BTzzu%2FI7XS5tfQ3qKP4q%2BzeoSLUbFC876KKlEeuvoWQsieiNJ%2BujXRSQugMI%2BRlLyRnNi24O7REwJ%2BfJLcw8G2M6%2FCsehfkF4yKsNxa9PfLM7vo8VXW4mzbn4x5dUWndhCQi8p43hRdAVJno%2BeuXYWA6Vo3%2BSJUgtTDI2Pm4BjqwAcyLl771Cu3o1wKjEo%2FCvyC0eaIjVBBfFqZjoP%2BEmIvHSD4fjWx%2BHmqMQWhu0MgfvUQ0NdYuMBK1TEoxGIxGODLvJ9wc69lbzrycCMYd9W4Er%2BMfk%2FyBiuSOnevxWeKVKxmN%2FbxI7rMZMH6AQpow7LM5e6E32HFsAcatYmcecdZ0xCaUDwyf3hhTnYS2BDl%2BrnzNcXl3s7H%2FEeBzZ6twn05Uim5qw0iJ%2Bommy3tK82sC&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241027T180141Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDHPIJSWM%2F20241027%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a76aa1b8db802ed9df4acc67a4c6327b5cc6a20af1e50aca3555636ec0d0a7da", 
            calories: 400,
            cuisineType: ["Italian"],
            mealType: ["Dinner"],
            ingredientLines: ["Spaghetti", "Eggs", "Parmesan cheese", "Black pepper", "Pancetta"]
        },
        {
            id: 2,
            label: "Chicken Tikka Masala",
            image: "https://edamam-product-images.s3.amazonaws.com/web-img/750/750f453cf18a4e31ee0bfa1d1c460a9c.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDEsCk%2BKjv67GR2AYCww%2FuxNDifBHPjoBaH%2FkjJ44d9zgIgBGtgLYvdq4MFkzKM516y8qoMQjRGxcrYU8sfB2q08h8quQUIMhAAGgwxODcwMTcxNTA5ODYiDMIslzAmZnKwgc7hhSqWBULfz9BudvnhQvGQ0tw9PSC6NIpOz6GZcxQWapgKerq%2BzPeOiHmMydd%2FvnPCobLsx2L9fADxFN%2FVr4XerfQYLlIybHKsvhKbnYyuvZqb7Jfj4jM1PT0EOmYFggmJrRLg8ZBGBtD5kYVJR7ScoY3pXedOuEl42KY25qAHmXlXXnWaY%2FnSfYc5fZ2LHaQpDpGc1GumfUi9zWfowS6KXcW0a38ciMQvTzJZIyEq2anlR4IwNk0Cqcr19AbQnen0%2F9JaR9%2Bg8z0SniLjrg7c52T3iXJ%2FqbSvbQl0htwJrYlKa8pczTK08JEl0vllqdOADiGTdz%2Bg4c7mKElJ8WlboE4azzEZMMMxSoa14kzEdEB9OpKflNF4OMw4cSURSQyd6NSNFC9E9ikNT6V6YPiYSEUpB%2FVhBHFwDY4dOvShyb%2BN8DFdR48HEQTmo%2FdR3PuKoQ99BwghRfiEJtn%2F%2BLm1Md%2B0byzubCGa5JZqNt%2BzyGjXtf3fzV2nkaw4Hz%2Bny6mE6Ut3xPg%2FiGWgvE%2FRVvQqY7hK7u%2Fhte8ic2Q0%2Blp6V2RpSf3PSPD7Q0XaqU7OXnF13oWBlenF6fJZ9iKIlSR0HI%2B0ep0BWchpDAZhnEtY0YH%2F3nr89NIoAFT7a0cwBzPVWdi6OvnMWnblOeHysuD%2BMHW5C6HpWK32wOAPEEZ5RZa7UTidQKvF4wD7Yz%2FGfPWNTMVDvZXpDn7MNvm3dVMC5vzsWBxDhUF3pK5%2F1YQXVWQuIZ4eJyWrIwB0CHNuWPXuprMmaWYHtHzoN06RjmvwwUTs7zTJNDNXh9yX%2FkO2OL%2BrU%2Bh316EPe8ZelHACZfZGUzm6zbJk2jhVBUqVm9HQGtcSm8ThgnxRSbwAXvR2mDWUSn7delaN%2FJgRMJnt%2BbgGOrEBAE1TnpAtdKREtqmVRtTB%2B1Do37y%2FHHyUTBxM%2F6vc38%2F2q3y8JI12hVC3cYQ%2F2yhE%2F67NFnIyTApzZNUAanDCu18a35YhhZVIrcfgGJoHpDUpT1ZMxZdzQwHPF9kSZr56%2BKuiqNcZMl%2FAl8ny6tZ7big30UN5yUMb8o9L39leKUQd2pUnFJh0CWu6IF9Q7N5x%2BJziuLk4R8r%2BtCmTUrL8vJ90iNl0MDJTUyS7eYsLUqTl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241027T175841Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCJB5R5JI%2F20241027%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8764583497927b62bf74e39507456b307f3715206eba8945c7191872ddbaf339  ",
            calories: 600,
            cuisineType: ["Indian"],
            mealType: ["Dinner"]
        },
        {
            id: 3,
            label: "Vegetable Stir Fry",
            image: "https://edamam-product-images.s3.amazonaws.com/web-img/a49/a4910cbf99f3a3948acbe61ef891ae18.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDEsCk%2BKjv67GR2AYCww%2FuxNDifBHPjoBaH%2FkjJ44d9zgIgBGtgLYvdq4MFkzKM516y8qoMQjRGxcrYU8sfB2q08h8quQUIMhAAGgwxODcwMTcxNTA5ODYiDMIslzAmZnKwgc7hhSqWBULfz9BudvnhQvGQ0tw9PSC6NIpOz6GZcxQWapgKerq%2BzPeOiHmMydd%2FvnPCobLsx2L9fADxFN%2FVr4XerfQYLlIybHKsvhKbnYyuvZqb7Jfj4jM1PT0EOmYFggmJrRLg8ZBGBtD5kYVJR7ScoY3pXedOuEl42KY25qAHmXlXXnWaY%2FnSfYc5fZ2LHaQpDpGc1GumfUi9zWfowS6KXcW0a38ciMQvTzJZIyEq2anlR4IwNk0Cqcr19AbQnen0%2F9JaR9%2Bg8z0SniLjrg7c52T3iXJ%2FqbSvbQl0htwJrYlKa8pczTK08JEl0vllqdOADiGTdz%2Bg4c7mKElJ8WlboE4azzEZMMMxSoa14kzEdEB9OpKflNF4OMw4cSURSQyd6NSNFC9E9ikNT6V6YPiYSEUpB%2FVhBHFwDY4dOvShyb%2BN8DFdR48HEQTmo%2FdR3PuKoQ99BwghRfiEJtn%2F%2BLm1Md%2B0byzubCGa5JZqNt%2BzyGjXtf3fzV2nkaw4Hz%2Bny6mE6Ut3xPg%2FiGWgvE%2FRVvQqY7hK7u%2Fhte8ic2Q0%2Blp6V2RpSf3PSPD7Q0XaqU7OXnF13oWBlenF6fJZ9iKIlSR0HI%2B0ep0BWchpDAZhnEtY0YH%2F3nr89NIoAFT7a0cwBzPVWdi6OvnMWnblOeHysuD%2BMHW5C6HpWK32wOAPEEZ5RZa7UTidQKvF4wD7Yz%2FGfPWNTMVDvZXpDn7MNvm3dVMC5vzsWBxDhUF3pK5%2F1YQXVWQuIZ4eJyWrIwB0CHNuWPXuprMmaWYHtHzoN06RjmvwwUTs7zTJNDNXh9yX%2FkO2OL%2BrU%2Bh316EPe8ZelHACZfZGUzm6zbJk2jhVBUqVm9HQGtcSm8ThgnxRSbwAXvR2mDWUSn7delaN%2FJgRMJnt%2BbgGOrEBAE1TnpAtdKREtqmVRtTB%2B1Do37y%2FHHyUTBxM%2F6vc38%2F2q3y8JI12hVC3cYQ%2F2yhE%2F67NFnIyTApzZNUAanDCu18a35YhhZVIrcfgGJoHpDUpT1ZMxZdzQwHPF9kSZr56%2BKuiqNcZMl%2FAl8ny6tZ7big30UN5yUMb8o9L39leKUQd2pUnFJh0CWu6IF9Q7N5x%2BJziuLk4R8r%2BtCmTUrL8vJ90iNl0MDJTUyS7eYsLUqTl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241027T180303Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCJB5R5JI%2F20241027%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=39b4f47738463c47ead2433e5555cfc0acf1ee3b97b4195390e96ec9eced3230",
            calories: 350,
            cuisineType: ["Asian"],
            mealType: ["Lunch", "Dinner"]
        },
        {
            id: 4,
            label: "Beef Tacos",
            image: "https://edamam-product-images.s3.amazonaws.com/web-img/be9/be94125c5e63e23d38e8cac4283ec385?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDEsCk%2BKjv67GR2AYCww%2FuxNDifBHPjoBaH%2FkjJ44d9zgIgBGtgLYvdq4MFkzKM516y8qoMQjRGxcrYU8sfB2q08h8quQUIMhAAGgwxODcwMTcxNTA5ODYiDMIslzAmZnKwgc7hhSqWBULfz9BudvnhQvGQ0tw9PSC6NIpOz6GZcxQWapgKerq%2BzPeOiHmMydd%2FvnPCobLsx2L9fADxFN%2FVr4XerfQYLlIybHKsvhKbnYyuvZqb7Jfj4jM1PT0EOmYFggmJrRLg8ZBGBtD5kYVJR7ScoY3pXedOuEl42KY25qAHmXlXXnWaY%2FnSfYc5fZ2LHaQpDpGc1GumfUi9zWfowS6KXcW0a38ciMQvTzJZIyEq2anlR4IwNk0Cqcr19AbQnen0%2F9JaR9%2Bg8z0SniLjrg7c52T3iXJ%2FqbSvbQl0htwJrYlKa8pczTK08JEl0vllqdOADiGTdz%2Bg4c7mKElJ8WlboE4azzEZMMMxSoa14kzEdEB9OpKflNF4OMw4cSURSQyd6NSNFC9E9ikNT6V6YPiYSEUpB%2FVhBHFwDY4dOvShyb%2BN8DFdR48HEQTmo%2FdR3PuKoQ99BwghRfiEJtn%2F%2BLm1Md%2B0byzubCGa5JZqNt%2BzyGjXtf3fzV2nkaw4Hz%2Bny6mE6Ut3xPg%2FiGWgvE%2FRVvQqY7hK7u%2Fhte8ic2Q0%2Blp6V2RpSf3PSPD7Q0XaqU7OXnF13oWBlenF6fJZ9iKIlSR0HI%2B0ep0BWchpDAZhnEtY0YH%2F3nr89NIoAFT7a0cwBzPVWdi6OvnMWnblOeHysuD%2BMHW5C6HpWK32wOAPEEZ5RZa7UTidQKvF4wD7Yz%2FGfPWNTMVDvZXpDn7MNvm3dVMC5vzsWBxDhUF3pK5%2F1YQXVWQuIZ4eJyWrIwB0CHNuWPXuprMmaWYHtHzoN06RjmvwwUTs7zTJNDNXh9yX%2FkO2OL%2BrU%2Bh316EPe8ZelHACZfZGUzm6zbJk2jhVBUqVm9HQGtcSm8ThgnxRSbwAXvR2mDWUSn7delaN%2FJgRMJnt%2BbgGOrEBAE1TnpAtdKREtqmVRtTB%2B1Do37y%2FHHyUTBxM%2F6vc38%2F2q3y8JI12hVC3cYQ%2F2yhE%2F67NFnIyTApzZNUAanDCu18a35YhhZVIrcfgGJoHpDUpT1ZMxZdzQwHPF9kSZr56%2BKuiqNcZMl%2FAl8ny6tZ7big30UN5yUMb8o9L39leKUQd2pUnFJh0CWu6IF9Q7N5x%2BJziuLk4R8r%2BtCmTUrL8vJ90iNl0MDJTUyS7eYsLUqTl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241027T180442Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFCJB5R5JI%2F20241027%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=daa2f3dda2b3c297b1076afe19035a9e8177e395fc90b96ecd024f39829afaa0",
            calories: 500,
            cuisineType: ["Mexican"],
            mealType: ["Lunch", "Dinner"]
        },
        {
            id: 5,
            label: "Caesar Salad",
            image: "https://edamam-product-images.s3.amazonaws.com/web-img/4ae/4ae57783b42b6c590ad4814d45f7aa21.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDEsCk%2BKjv67GR2AYCww%2FuxNDifBHPjoBaH%2FkjJ44d9zgIgBGtgLYvdq4MFkzKM516y8qoMQjRGxcrYU8sfB2q08h8quQUIMhAAGgwxODcwMTcxNTA5ODYiDMIslzAmZnKwgc7hhSqWBULfz9BudvnhQvGQ0tw9PSC6NIpOz6GZcxQWapgKerq%2BzPeOiHmMydd%2FvnPCobLsx2L9fADxFN%2FVr4XerfQYLlIybHKsvhKbnYyuvZqb7Jfj4jM1PT0EOmYFggmJrRLg8ZBGBtD5kYVJR7ScoY3pXedOuEl42KY25qAHmXlXXnWaY%2FnSfYc5fZ2LHaQpDpGc1GumfUi9zWfowS6KXcW0a38ciMQvTzJZIyEq2anlR4IwNk0Cqcr19AbQnen0%2F9JaR9%2Bg8z0SniLjrg7c52T3iXJ%2FqbSvbQl0htwJrYlKa8pczTK08JEl0vllqdOADiGTdz%2Bg4c7mKElJ8WlboE4azzEZMMMxSoa14kzEdEB9OpKflNF4OMw4cSURSQyd6NSNFC9E9ikNT6V6YPiYSEUpB%2FVhBHFwDY4dOvShyb%2BN8DFdR48HEQTmo%2FdR3PuKoQ99BwghRfiEJtn%2F%2BLm1Md%2B0byzubCGa5JZqNt%2BzyGjXtf3fzV2nkaw4Hz%2Bny6mE6Ut3xPg%2FiGWgvE%2FRVvQqY7hK7u%2Fhte8ic2Q0%2Blp6V2RpSf3PSPD7Q0XaqU7OXnF13oWBlenF6fJZ9iKIlSR0HI%2B0ep0BWchpDAZhnEtY0YH%2F3nr89NIoAFT7a0cwBzPVWdi6OvnMWnblOeHysuD%2BMHW5C6HpWK32wOAPEEZ5RZa7UTidQKvF4wD7Yz%2FGfPWNTMVDvZXpDn7MNvm3dVMC5vzsWBxDhUF3pK5%2F1YQXVWQuIZ4eJyWrIwB0CHNuWPXuprMmaWYHtHzoN06RjmvwwUTs7zTJNDNXh9yX%2FkO2OL%2BrU%2Bh316EPe8ZelHACZfZGUzm6zbJk2jhVBUqVm9HQGtcSm8ThgnxRSbwAXvR2mDWUSn7delaN%2FJgRMJnt%2BbgGOrEBAE1TnpAtdKREtqmVRtTB%2B1Do37y%2FHHyUTBxM%2F6vc38%2F2q3y8JI12hVC3cYQ%2F2yhE%2F67NFnIyTApzZNUAanDCu18a35YhhZVIrcfgGJoHpDUpT1ZMxZdzQwHPF9kSZr56%2BKuiqNcZMl%2FAl8ny6tZ7big30UN5yUMb8o9L39leKUQd2pUnFJh0CWu6IF9Q7N5x%2BJziuLk4R8r%2BtCmTUrL8vJ90iNl0MDJTUyS7eYsLUqTl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241027T180513Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFCJB5R5JI%2F20241027%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4d6977781d4aaafbf0ae819a0cf6bdc87acbdfcdba9ff8173437f32cb8fd7d5d",
            calories: 300,
            cuisineType: ["Italian"],
            mealType: ["Lunch"]
        },
        // Add more trending recipes ....
    ];

    const searchThisRecipe = (recipe) => {
        console.log('Searching for recipe:', recipe);
        setQuery(recipe.label);  
        setCurrentPage(1); 
    };
    return (
        <center>
            <div className='recipePage'>
                <div className="slideHere">
                    <Slideshow />
                </div>
                <form onSubmit={handleSearch}>
                    <center>
                        <div className="recipe-inputContainer">
                            <input type="text" name="query" placeholder="Search for a recipe" />
                            <button type="submit" className='btn2 searchBtn'>
                                <span>Search Recipe</span>
                            </button>
                        </div>
                    </center>
                </form>

                {loading ? (
                    <center>
                        <InfinitySpin
                            visible={true}
                            width="200"
                            color="#00d4ff"
                            ariaLabel="infinity-spin-loading"
                        />
                    </center>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : query === '' ? ( // Check if query is empty
                    <div className="empty-state">
                        <div className="trendyRecipes">
                            <h1 className='recipeHeading'>Trending Recipes</h1>
                            <div className="trendYrecipeCardContainer">
                                {trendingRecipes.map((recipe) => (
                                    <div key={recipe.id} className={`trendYrecipe-card recipe-card-${recipe.id}`}>
                                        <div className={`trendYleftBox-${recipe.id}`}>
                                            <h2 className={`trendYrecipeName recipeName-${recipe.id}`}>{recipe.label}</h2>
                                            <img className={`trendYrecipeImg recipeImg-${recipe.id}`} src={recipe.image} alt={recipe.label} />
                                        </div>
                                        <div className={`trendYrightBox-${recipe.id}`}>
                                            <p className='trendYrecipePara'><strong>Calories:</strong> {recipe.calories}</p>
                                            <p className='trendYrecipePara'><strong>Cuisine Type:</strong> {recipe.cuisineType.join(', ')}</p>
                                            <p className='trendYrecipePara'><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
                                            <p className='trendYrecipePara'><strong>Ingredients:</strong></p>
                                            <button className={`trendyBTn btn2-${recipe.id}`} onClick={() => searchThisRecipe(recipe)}>
                                                <span>Search This Recipe</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className='recipeHeading'>Recipes</h1>
                        {currentRecipes.map((recipe, index) => (
                            <div key={index} className="recipe-card">
                                <div className="leftBox">
                                    <h2 className='recipeName'>{recipe.recipe.label}</h2>
                                    <img className='recipeImg' src={recipe.recipe.image} alt={recipe.recipe.label} />
                                </div>
                                <div className="rightBox">
                                    <div className="rightUpper">
                                        <div className="rightUpperRight">
                                            <p><strong>Calories:</strong> {Math.round(recipe.recipe.calories)}</p>
                                            <p><strong>Cuisine Type:</strong> {recipe.recipe.cuisineType?.join(', ') || 'N/A'}</p>
                                            <p><strong>Meal Type:</strong> {recipe.recipe.mealType?.join(', ') || 'N/A'}</p>
                                            <p><strong>Dish Type:</strong> {recipe.recipe.dishType?.join(', ') || 'N/A'}</p>
                                            <p><strong>Diet Labels:</strong> {recipe.recipe.dietLabels?.join(', ') || 'N/A'}</p>
                                            <p><strong>Total Time:</strong> {recipe.recipe.totalTime ? `${recipe.recipe.totalTime} minutes` : 'N/A'}</p>
                                            <p><strong>CO2 Emissions Class:</strong> {recipe.recipe.co2EmissionsClass || 'N/A'}</p>
                                        </div>
                                        <div className="rightUpperLeft recipeIngredients">
                                            <p className='IngredientsHeading'><strong>Ingredients:</strong></p>
                                            <ul className='IngredientsList' type='circle'>
                                                {recipe.recipe.ingredientLines.map((ingredient, i) => (
                                                    <li className='IngredientListItem' key={i}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="rightLower">
                                        <details className='rightLowerLeftSide'>
                                            <summary><strong>Health Labels:</strong></summary>
                                            <p>{recipe.recipe.healthLabels?.join(', ') || 'N/A'}</p>
                                        </details>
                                        <div className="rightLowerRightSide buttons">
                                            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                <button className='btn3 btn3-1'>
                                                    <span>View Full Recipe</span>
                                                </button>
                                            </a>
                                            <button className='btn2 btn3-2' onClick={() => handleingredientNutritionsAnalysis(recipe.recipe)}>
                                                <span>Nutrition Analysis</span>
                                            </button>
                                            <button className='btn1 btn3-3' onClick={() => handleAddToFavorite(recipe.recipe)}>
                                                <span>Add to Favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='paginationButtons'>
                            {Array.from({ length: Math.ceil(recipes.length / itemsPerPage) }, (_, index) => (
                                <button id='paginationButton' className='btn5' key={index + 1} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </center>
    );
};

export default Recipe;
