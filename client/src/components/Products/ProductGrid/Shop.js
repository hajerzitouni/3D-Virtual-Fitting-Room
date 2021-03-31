import React, { useEffect, useState } from 'react'
import Product from "../Product/Product";
import './shop.css'
import {filterProducts,searchProducts,filterProductsBySize} from "../../../redux/slices/products"
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
function Shop(props) {
    const sizes = ["XXS","XS","XS-S","S","M","M-L","L","XL"]
      const products = useSelector((state) => state.products.products)
      const categories = useSelector((state) => state.categories.categories)
     const dispatch = useDispatch()
       const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
        console.log(values)
 dispatch(searchProducts(values.search))
    }
  });
  const stormik = useFormik({
       initialValues: {
      tailles: [] ,
    },
    onSubmit: async (values) => {
       dispatch(filterProductsBySize(values))
    }
  })
let table=[]
  const handleChange=(event)=>{
      console.log(event.target.checked)
      if(event.target.checked){
        
 stormik.setFieldValue('tailles',([...stormik.values.tailles,event.target.value]));
 table = stormik.values.tailles
 console.log(event.target.value)
 if(table.indexOf(event.target.value)===-1){
 table.push(event.target.value)
 dispatch(filterProductsBySize(table))
 console.log(stormik.values.tailles)}}
      else{
            var array = [...stormik.values.tailles]; // make a separate copy of the array
  var index = array.indexOf(event.target.value)
  if (index !== -1) {
    array.splice(index, 1);
stormik.setFieldValue('tailles',array)
  
 console.log(array)
    dispatch(filterProductsBySize(array))
      }
     
  }}
    return (
        
        <div>
    
    <section className="shop spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <div className="shop__sidebar">
                        <div className="sidebar__categories">
                            <div className="section-title">
                                <h4>Categories</h4>
                            </div>
                            <div className="categories__accordion">
                                <div className="accordion" id="accordionExample">
                                    <div className="card">
                                        <div className="card-heading active">
                                            <a data-toggle="collapse" data-target="#collapseOne">Women</a>
                                        </div>
                                        <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <ul>
                                                    <li><a href="#">Coats</a></li>
                                                    <li><a href="#">Jackets</a></li>
                                                    <li><a href="#">Dresses</a></li>
                                                    <li><a href="#">Shirts</a></li>
                                                    <li><a href="#">T-shirts</a></li>
                                                    <li><a href="#">Jeans</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseTwo">Men</a>
                                        </div>
                                        <div id="collapseTwo" className="collapse" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <ul>
                                                    <li><a href="#">Coats</a></li>
                                                    <li><a href="#">Jackets</a></li>
                                                    <li><a href="#">Dresses</a></li>
                                                    <li><a href="#">Shirts</a></li>
                                                    <li><a href="#">T-shirts</a></li>
                                                    <li><a href="#">Jeans</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseThree">Kids</a>
                                        </div>
                                        <div id="collapseThree" className="collapse" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <ul>
                                                    <li><a href="#">Coats</a></li>
                                                    <li><a href="#">Jackets</a></li>
                                                    <li><a href="#">Dresses</a></li>
                                                    <li><a href="#">Shirts</a></li>
                                                    <li><a href="#">T-shirts</a></li>
                                                    <li><a href="#">Jeans</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseFour">Accessories</a>
                                        </div>
                                        <div id="collapseFour" className="collapse" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <ul>
                                                    {categories.map((cat)=>{return <li key={cat._id}><button key={cat._id}onClick={()=>{dispatch(filterProducts(cat.categoryName))}}>{cat.categoryName}</button></li>})}
                                   
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseFive">Cosmetic</a>
                                        </div>
                                        <div id="collapseFive" className="collapse" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <ul>
                                                    <li><a href="#">Coats</a></li>
                                                    <li><a href="#">Jackets</a></li>
                                                    <li><a href="#">Dresses</a></li>
                                                    <li><a href="#">Shirts</a></li>
                                                    <li><a href="#">T-shirts</a></li>
                                                    <li><a href="#">Jeans</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__filter">
                            <div className="section-title">
                                <h4>Shop by price</h4>
                            </div>
                            <div className="filter-range-wrap">
                                <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                data-min="33" data-max="99"></div>
                                <div className="range-slider">
                                    <div className="price-input">
                                        <p>Price:</p>
                                        <input type="text" id="minamount"/>
                                        <input type="text" id="maxamount"/>
                                    </div>
                                </div>
                            </div>
                            <a href="#">Filter</a>
                        </div>
                        <div className="sidebar__sizes">
                            <div className="section-title">
                                <h4>Shop by size</h4>
                            </div>

                            <div className="size__list">
                                
                                {sizes.map((size,index)=>{return<label key={index} htmlFor={size}>
                                    {size}
                                    <input key={size} onChange={(event)=>handleChange(event)} value={size}   type="checkbox" id={size} />
                                    <span className="checkmark"></span>
                                </label>})}
                            
                            </div>
                        </div>
                        <div className="sidebar__color">
                            <div className="section-title">
                                <h4>Shop by size</h4>
                            </div>
                            <div className="size__list color__list">
                                <label htmlFor="black">
                                    Blacks
                                    <input type="checkbox" id="black"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label htmlFor="whites">
                                    Whites
                                    <input type="checkbox" id="whites"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label htmlFor="reds">
                                    Reds
                                    <input type="checkbox" id="reds"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label htmlFor="greys">
                                    Greys
                                    <input type="checkbox" id="greys"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label htmlFor="blues">
                                    Blues
                                    <input type="checkbox" id="blues"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label htmlFor="beige">
                                    Beige Tones
                                    <input type="checkbox" id="beige"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label htmlFor="greens">
                                    Greens
                                    <input type="checkbox" id="greens"/>
                                    <span className="checkmark"></span>
                                </label>
                                <label htmlFor="yellows">
                                    Yellows
                                    <input type="checkbox" id="yellows"/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-9 col-md-9">
                
                <div>
                <form onSubmit={formik.handleSubmit }>
              
              <input
                name="search"
                type="text"
                placeholder="search..."
                value={formik.values.search}
                onChange={formik.handleChange}
              />

            <button  type="submit" >
              search
              </button>

          </form> 
                </div>
                     <br/>
                    <div className="row">
                            {products.map((product)=>{ 
           return<Product key={product._id} product={product} class="col-lg-4 col-md-4 col-sm-6 mix cosmetic" stars="5"/> 

        })}
                        <div className="col-lg-12 text-center">
                            <div className="pagination__option">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#"><i className="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}

export default Shop