import React from 'react';
// icon
import icon_next from '../../assets/images/home/next.png';
import author from '../../assets/images/home/author.svg';
import date from '../../assets/images/home/date.svg';
import loadgif from '../../assets/images/home/load.gif';
// import link
import { Link } from 'react-router-dom';
// 
import './NewsSection.scss';
const NewsSection = ({ newsList }) => {
    return (
        <div className='product-section'>
            <div className="container_content_home container_news d_flex al_ct jc_ct">
                <div className="content_home news">
                    <div className="content_home_top news_top d_flex jc_ct jc_sb">
                        <div className="cthome_top_left">
                            <h2 className="cthome_top_text">Tin tức mới nhất</h2>
                        </div>
                        <div className="cthome_top_right cthome_top_right_all">
                            <Link to="#" rel="nofollow" className="cthome_top_right_viewall">Xem tất cả</Link>
                            <img src={icon_next} width="24px" height="24px" alt="icon" />
                        </div>
                    </div>

                    <div className="content_home_center news_center w100 d_flex al_ct">
                        <div className="news_center_container">
                            {newsList.map((item) => (
                                <div key={item.id} className="news_center_item">
                                    <div className="news_center_head">
                                        <Link to="#" className="w100 h100" rel="nofollow">
                                            <img className="news_center-img lazyload"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = {loadgif};
                                                }}
                                                src={item.image}
                                                alt="anh"
                                            />
                                        </Link>
                                    </div>
                                    <div className="news_center_content">
                                        <Link to="#" rel="nofollow">
                                            <h3 className="news_center_title">{item.title}</h3>
                                        </Link>
                                        <div className="news_center_infor">
                                            <div className="news_author">
                                                <img src={author} width="14px" height="14px" alt="icon" />
                                                <p className="font_s14 line_h18 cl_000">{item.author}</p>
                                            </div>
                                            <div className="news_createdate">
                                                <img src={date} width="14px" height="14px" alt="icon" />
                                                <p className="font_s14 line_h18 cl_000">{item.date}</p>
                                            </div>
                                        </div>
                                        <p className="news_center_desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="content_home_bottom"></div>
                </div>
            </div>
        </div>
    )
}

export default NewsSection;