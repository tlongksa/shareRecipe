import React from 'react';
import './index.scss';
import MainLogo from '../common/Logo';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="custom-page__container">
                <div className="footer-rows">
                    <div className="footer-col">
                        <MainLogo className="logo-md" rightTextClassName="text-green" />
                        <ul>
                            <li>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.2798 4.75291L17.9769 4.44871C17.1931 3.66175 16.2616 3.03731 15.2359 2.61123C14.2102 2.18515 13.1105 1.96582 11.9998 1.96582C10.8891 1.96582 9.78939 2.18515 8.76369 2.61123C7.73799 3.03731 6.80653 3.66175 6.02276 4.44871L5.71976 4.75241C4.13754 6.34487 3.24951 8.49857 3.24951 10.7434C3.24951 12.9883 4.13754 15.142 5.71976 16.7344L10.1847 21.2119C10.4221 21.4517 10.7049 21.6418 11.0165 21.7712C11.3281 21.9006 11.6623 21.9668 11.9998 21.9658C12.3372 21.9667 12.6714 21.9005 12.9831 21.7711C13.2947 21.6417 13.5775 21.4516 13.8151 21.2119L18.279 16.7344C19.8614 15.1422 20.7497 12.9886 20.7498 10.7438C20.75 8.49901 19.862 6.3453 18.2798 4.75291ZM17.2158 15.6758L12.7519 20.1533C12.6533 20.2524 12.5361 20.3309 12.407 20.3846C12.2779 20.4382 12.1396 20.4658 11.9998 20.4658C11.8601 20.4658 11.7217 20.4382 11.5926 20.3846C11.4636 20.3309 11.3464 20.2524 11.2478 20.1533L6.78306 15.6758C5.48062 14.3646 4.74964 12.5915 4.74964 10.7434C4.74964 8.89529 5.48062 7.12219 6.78306 5.81101L7.08596 5.50731C7.73026 4.86033 8.49599 4.34697 9.33919 3.99667C10.1824 3.64638 11.0865 3.46606 11.9996 3.46606C12.9126 3.46606 13.8167 3.64638 14.6599 3.99667C15.5031 4.34697 16.2689 4.86033 16.9132 5.50731L17.216 5.81151C18.5187 7.12244 19.2499 8.89552 19.2499 10.7437C19.2499 12.5918 18.5187 14.3649 17.216 15.6758H17.2158ZM11.9998 7.15381C11.3076 7.15413 10.6311 7.35967 10.0557 7.74445C9.48034 8.12922 9.03198 8.67596 8.76732 9.31553C8.50266 9.9551 8.43358 10.6588 8.56881 11.3376C8.70403 12.0164 9.0375 12.6399 9.52705 13.1293C10.0166 13.6186 10.6402 13.9518 11.3191 14.0867C11.998 14.2216 12.7017 14.1522 13.3411 13.8872C13.9806 13.6223 14.5271 13.1737 14.9116 12.5981C15.2961 12.0226 15.5014 11.346 15.5014 10.6538C15.5 9.72569 15.1306 8.836 14.4742 8.17986C13.8177 7.52373 12.9279 7.15474 11.9998 7.15381ZM11.9998 12.6533C11.6042 12.6531 11.2176 12.5357 10.8888 12.3158C10.56 12.0959 10.3038 11.7834 10.1526 11.4179C10.0014 11.0524 9.96192 10.6503 10.0392 10.2624C10.1165 9.87448 10.3071 9.5182 10.5869 9.23861C10.8667 8.95901 11.2231 8.76866 11.6111 8.69162C11.9991 8.61457 12.4012 8.65431 12.7666 8.80578C13.132 8.95726 13.4442 9.21369 13.6639 9.54263C13.8836 9.87157 14.0008 10.2583 14.0007 10.6538C13.9999 11.1841 13.7888 11.6925 13.4137 12.0673C13.0386 12.4422 12.5301 12.6529 11.9998 12.6533Z"
                                        fill="#072442"
                                    />
                                </svg>
                                <span>Address</span>
                            </li>
                            <li>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19.24 9.27003C19.24 7.34986 18.4772 5.50834 17.1195 4.15058C15.7617 2.79281 13.9202 2.03003 12 2.03003C10.0798 2.03003 8.23831 2.79281 6.88055 4.15058C5.52278 5.50834 4.76 7.34986 4.76 9.27003C4.07731 9.33211 3.44214 9.64602 2.97817 10.1507C2.5142 10.6553 2.25463 11.3145 2.25 12V15C2.25 15.7294 2.53973 16.4288 3.05546 16.9446C3.57118 17.4603 4.27065 17.75 5 17.75H6C6.46332 17.7474 6.90691 17.5622 7.23454 17.2346C7.56216 16.9069 7.74738 16.4633 7.75 16V11C7.74953 10.5822 7.59873 10.1785 7.32515 9.86269C7.05157 9.54688 6.67349 9.34006 6.26 9.28003C6.26 7.75769 6.86475 6.2977 7.94121 5.22124C9.01767 4.14478 10.4777 3.54003 12 3.54003C13.5223 3.54003 14.9823 4.14478 16.0588 5.22124C17.1353 6.2977 17.74 7.75769 17.74 9.28003C17.3265 9.34006 16.9484 9.54688 16.6748 9.86269C16.4013 10.1785 16.2505 10.5822 16.25 11V16C16.2497 16.3298 16.3437 16.6528 16.5208 16.931C16.698 17.2091 16.951 17.4309 17.25 17.57V18C17.25 18.3316 17.1183 18.6495 16.8839 18.8839C16.6495 19.1183 16.3315 19.25 16 19.25H14.48C14.3302 18.8798 14.073 18.5628 13.7415 18.34C13.41 18.1173 13.0194 17.9988 12.62 18H11.38C10.8496 18 10.3409 18.2107 9.96579 18.5858C9.59071 18.9609 9.38 19.4696 9.38 20C9.38 20.5305 9.59071 21.0392 9.96579 21.4142C10.3409 21.7893 10.8496 22 11.38 22H12.62C13.0194 22.0012 13.41 21.8828 13.7415 21.66C14.073 21.4372 14.3302 21.1203 14.48 20.75H16C16.7293 20.75 17.4288 20.4603 17.9445 19.9446C18.4603 19.4288 18.75 18.7294 18.75 18V17.75H19C19.7293 17.75 20.4288 17.4603 20.9445 16.9446C21.4603 16.4288 21.75 15.7294 21.75 15V12C21.7454 11.3145 21.4858 10.6553 21.0218 10.1507C20.5579 9.64602 19.9227 9.33211 19.24 9.27003ZM6.25 16C6.25 16.0663 6.22366 16.1299 6.17678 16.1768C6.12989 16.2237 6.0663 16.25 6 16.25H5C4.66848 16.25 4.35054 16.1183 4.11612 15.8839C3.8817 15.6495 3.75 15.3316 3.75 15V12C3.75 11.6685 3.8817 11.3506 4.11612 11.1161C4.35054 10.8817 4.66848 10.75 5 10.75H6C6.0663 10.75 6.12989 10.7764 6.17678 10.8233C6.22366 10.8701 6.25 10.9337 6.25 11V16ZM12.62 20.5H11.38C11.2474 20.5 11.1202 20.4474 11.0264 20.3536C10.9327 20.2598 10.88 20.1326 10.88 20C10.88 19.8674 10.9327 19.7402 11.0264 19.6465C11.1202 19.5527 11.2474 19.5 11.38 19.5H12.62C12.7526 19.5 12.8798 19.5527 12.9736 19.6465C13.0673 19.7402 13.12 19.8674 13.12 20C13.12 20.1326 13.0673 20.2598 12.9736 20.3536C12.8798 20.4474 12.7526 20.5 12.62 20.5ZM20.25 15C20.25 15.3316 20.1183 15.6495 19.8839 15.8839C19.6495 16.1183 19.3315 16.25 19 16.25H18C17.9337 16.25 17.8701 16.2237 17.8232 16.1768C17.7763 16.1299 17.75 16.0663 17.75 16V11C17.75 10.9337 17.7763 10.8701 17.8232 10.8233C17.8701 10.7764 17.9337 10.75 18 10.75H19C19.3315 10.75 19.6495 10.8817 19.8839 11.1161C20.1183 11.3506 20.25 11.6685 20.25 12V15Z"
                                        fill="#072442"
                                    />
                                </svg>
                                <span>Hotline: 1800 996688</span>
                            </li>
                            <li>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.0399 5.45013C22.0399 5.45013 22.0399 5.40013 22.0399 5.38013C21.9798 4.96133 21.7709 4.57819 21.4513 4.30088C21.1318 4.02357 20.723 3.87065 20.2999 3.87013H3.69991C3.27509 3.86824 2.86393 4.02007 2.54229 4.2976C2.22065 4.57512 2.01025 4.95962 1.94991 5.38013V5.45013C1.94508 5.5067 1.94508 5.56357 1.94991 5.62013V18.3801C1.94991 18.8443 2.13428 19.2894 2.46247 19.6176C2.79066 19.9458 3.23578 20.1301 3.69991 20.1301H20.2999C20.764 20.1301 21.2092 19.9458 21.5373 19.6176C21.8655 19.2894 22.0499 18.8443 22.0499 18.3801V5.62013C22.0499 5.56013 22.0399 5.51013 22.0399 5.45013ZM20.2799 5.37013L12.1499 11.2501C12.107 11.2789 12.0566 11.2943 12.0049 11.2943C11.9533 11.2943 11.9028 11.2789 11.8599 11.2501L3.71991 5.37013H20.2799ZM20.2799 18.6301H3.69991C3.6336 18.6301 3.57002 18.6038 3.52313 18.5569C3.47625 18.51 3.44991 18.4464 3.44991 18.3801V7.02013L10.9499 12.4601C11.2405 12.672 11.5903 12.7874 11.9499 12.7901C12.3089 12.7835 12.6575 12.6685 12.9499 12.4601L20.5499 7.02013V18.3801C20.5499 18.4464 20.5236 18.51 20.4767 18.5569C20.4298 18.6038 20.3662 18.6301 20.2999 18.6301H20.2799Z"
                                        fill="#072442"
                                    />
                                </svg>
                                <span>Email: cskh@foodrecipes.com</span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-col__title">Về chúng tôi</h3>
                        <ul>
                            <li>Wiki</li>
                            <li>Giới thiệu</li>
                            <li>Liên hệ</li>
                            <li>Quên mật khẩu</li>
                            <li>Việc làm</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-col__title">Chính sách</h3>
                        <ul>
                            <li>Chính sách bảo mật</li>
                            <li>Quy định sử dụng</li>
                            <li>Giải quyết khiếu nại</li>
                            <li>Quy chế hoạt động</li>
                            <li>Quy định đăng tin</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-col__title">Khám phá FoodRecipes</h3>
                        <ul>
                            <li>
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.39844 12.0563C2.39844 17.029 6.00996 21.1639 10.7334 22.0024V14.7785H8.23288V12.0005H10.7334V9.77758C10.7334 7.2771 12.3445 5.8885 14.6233 5.8885C15.3451 5.8885 16.1236 5.99936 16.8454 6.11021V8.66653H15.5676C14.3449 8.66653 14.0673 9.27748 14.0673 10.056V12.0005H16.7345L16.2902 14.7785H14.0673V22.0024C18.7907 21.1639 22.4022 17.0298 22.4022 12.0563C22.4022 6.52446 17.9014 1.9986 12.4003 1.9986C6.89929 1.9986 2.39844 6.52446 2.39844 12.0563Z"
                                        fill="#5E7184"
                                    />
                                </svg>
                                <span>Facebook</span>
                            </li>
                            <li>
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.3975 8.96824C10.7288 8.96824 9.36709 10.33 9.36709 11.9986C9.36709 13.6672 10.7288 15.029 12.3975 15.029C14.0661 15.029 15.4278 13.6672 15.4278 11.9986C15.4278 10.33 14.0661 8.96824 12.3975 8.96824ZM21.4863 11.9986C21.4863 10.7437 21.4977 9.5002 21.4272 8.24759C21.3567 6.79265 21.0248 5.50139 19.9609 4.43747C18.8947 3.37127 17.6057 3.04163 16.1508 2.97116C14.8959 2.90069 13.6523 2.91205 12.3997 2.91205C11.1448 2.91205 9.90133 2.90069 8.64872 2.97116C7.19377 3.04163 5.90252 3.37354 4.83859 4.43747C3.77239 5.50366 3.44276 6.79265 3.37228 8.24759C3.30181 9.50248 3.31318 10.746 3.31318 11.9986C3.31318 13.2512 3.30181 14.497 3.37228 15.7496C3.44276 17.2046 3.77467 18.4958 4.83859 19.5597C5.90479 20.6259 7.19377 20.9556 8.64872 21.0261C9.9036 21.0965 11.1471 21.0852 12.3997 21.0852C13.6546 21.0852 14.8981 21.0965 16.1508 21.0261C17.6057 20.9556 18.897 20.6237 19.9609 19.5597C21.0271 18.4936 21.3567 17.2046 21.4272 15.7496C21.4999 14.497 21.4863 13.2535 21.4863 11.9986ZM12.3975 16.6612C9.81721 16.6612 7.73483 14.5789 7.73483 11.9986C7.73483 9.41836 9.81721 7.33598 12.3975 7.33598C14.9777 7.33598 17.0601 9.41836 17.0601 11.9986C17.0601 14.5789 14.9777 16.6612 12.3975 16.6612ZM17.251 8.23395C16.6486 8.23395 16.1621 7.74746 16.1621 7.14502C16.1621 6.54258 16.6486 6.05609 17.251 6.05609C17.8535 6.05609 18.34 6.54258 18.34 7.14502C18.3402 7.28807 18.3121 7.42975 18.2575 7.56195C18.2028 7.69414 18.1226 7.81426 18.0214 7.91541C17.9203 8.01656 17.8002 8.09677 17.668 8.15143C17.5358 8.20609 17.3941 8.23413 17.251 8.23395Z"
                                        fill="#5E7184"
                                    />
                                </svg>

                                <span>Instagram</span>
                            </li>
                            <li>
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.4377 4.59249C10.7408 4.32057 14.059 4.32057 17.3621 4.59249L19.581 4.77515C20.8169 4.87689 21.8279 5.85156 22.0322 7.13817C22.5433 10.3573 22.5433 13.6436 22.0322 16.8628C21.8279 18.1493 20.8169 19.124 19.581 19.2258L17.3621 19.4084C14.059 19.6803 10.7408 19.6803 7.4377 19.4084L5.21888 19.2258C3.983 19.124 2.97195 18.1493 2.76765 16.8628C2.25649 13.6436 2.25649 10.3573 2.76765 7.13817C2.97195 5.85156 3.983 4.87689 5.21888 4.77515L7.4377 4.59249ZM10.4194 14.5743V9.42661C10.4194 9.18363 10.6713 9.03354 10.8693 9.15856L14.9461 11.7325C15.1384 11.8538 15.1384 12.1471 14.9461 12.2684L10.8693 14.8424C10.6713 14.9674 10.4194 14.8172 10.4194 14.5743Z"
                                        fill="#5E7184"
                                    />
                                </svg>

                                <span>Youtube</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className="footer-bottom__text text-center">© 2021 Bản quyền thuộc về FoodRecipes</p>
            </div>
        </footer>
    );
}
