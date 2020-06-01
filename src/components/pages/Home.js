import React, {Component} from 'react';
import axios from 'axios';
import Product from './../Product';
import InfiniteScroll from 'react-infinite-scroller';
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            nextPage: 1,
            hasMore: true
        }
    }

    componentDidMount() {
        // const { params } = this.props.match;
        axios.get(`http://stadiumticket.ir/albums`)
            .then(response => {
                this.setState({
                    articles: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    // handleLoadMore() {
    //     axios.get(`http://stadiumticket.ir/album/y/pictures?page=${this.state.nextPage}`)
    //         .then(response => {
    //             const {current_page , last_page , data} = response.data.data;
    //             console.log(data);
    //             this.setState(prevState => ({
    //                 articles: [ ...prevState.articles , ...data],
    //                 hasMore: current_page !== last_page,
    //                 nextPage : current_page + 1
    //             }))
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    render() {
        const {articles} = this.state;

        return (
            <>
                {
                    articles.map((articles) =>
                        <div className="container">
                            {/*<div className="jumbotron rtl">*/}
                            <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0  ">Giti Gallery </h1>
                            <hr className="mt-2 mb-5"/>
                            <div className="row text-center text-lg-left">
                                <div className="col-lg-3 col-md-4 col-6">
                                    <div>
                                        <h2>{articles.name}</h2>
                                    </div>
                                    <link to="/home" className="d-block mb-4 h-100"/>
                                    <img className="img-fluid img-thumbnail" src={articles.pictures}/>

                                </div>
                                {/*<div className="col-lg-4" style={{ marginBottom : 20 }}>*/}
                                {/*    <div className="card">*/}
                                {/*        <img className="card-img-top" src={product.image} alt={product.title} />*/}
                                {/*        <div className="card-body">*/}
                                {/*            <h4 className="card-title">{product.title}</h4>*/}
                                {/*            <p className="card-text">{product.body.substr(0,100)}...</p>*/}
                                {/*            <Link className="btn btn-primary" to={`product/${product.id}`}>توضیحات بیشتر</Link>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                            </div>
                            {/*<p>لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.</p>*/}
                            {/*</div>*/}
                            {/*<InfiniteScroll*/}
                            {/*    className="row rtl"*/}
                            {/*    pageStart={0}*/}
                            {/*    loadMore={this.handleLoadMore.bind(this)}*/}
                            {/*    hasMore={this.state.hasMore}*/}
                            {/*    loader={<div className="loader">Loading ...</div>}*/}
                            {/*>*/}
                            {/*    {this.state.articles.map((product , index) => <Product product={product} key={index}/>)}*/}
                            {/*</InfiniteScroll>*/}


                        </div>
                    )
                }
            </>
        );


    }
}

export default Home;
