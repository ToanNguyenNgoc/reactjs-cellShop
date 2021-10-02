import React from 'react';
import {Container} from 'react-bootstrap'
import './Footer.css';
import Category from '../category/Category';

function Footer(props) {
      return (
            <div className="cus-footer">
                  <Container>
                        <div className="cus-footer__top">
                              <div className="cus-footer__top--shop">
                                    <div className="cus-footer__top--shop__top">
                                          <strong className="cus-footer__top--title">Tìm cửa hàng</strong>
                                          <p>Tìm cửa hàng gần nhất</p>
                                          <p>Mua hàng từ xa</p>
                                    </div>
                                    <div className="cus-footer__top--shop__payment">
                                          <strong className="cus-footer__top--title">Phương thức thanh toán</strong>
                                    </div>
                              </div>
                              <div className="cus-footer__top--contact">
                                    <p>Gọi mua hàng: 1800.0000 (8h - 20h)</p>
                                    <p>Gọi mua hàng: 1800.0000 (8h - 20h)</p>
                                    <p>Gọi bảo hành: 1800.0000 (8h - 20h)</p>
                              </div>
                              <div className="cus-footer__top--service">
                                    <p>Tra thông tin đơn hàng</p>
                                    <p>Tra điểm Smember</p>
                                    <p>Tra thông tin bảo hành</p>
                                    <p>Tra hóa đơn điện tử</p>
                                    <p>Quy định về sao lưu dữ liệu</p>
                                    <p>Dịch vụ bảo hành</p>
                              </div>
                              <div className="cus-footer__top--policy">
                                    <p>Quy chế hoạt động</p>
                                    <p>Chính sách bảo hành</p>
                                    <p>Liên hệ hợp tác kinh doanh</p>
                                    <p>Đơn doanh nghiệp</p>
                                    <p>Tuyển dụng</p>
                              </div>
                        </div>
                  </Container>
                  <div className="cus-footer__bottom">
                        <Container>
                              <div className="cus-footer__bottom--category">
                                    <div className="cus-footer__top--title align-center">Sản phẩm có sẵn tại cửa hàng</div>
                                    <Category />
                              </div>
                        </Container>
                  </div>
            </div>
      );
}

export default Footer;