import { useState, useEffect , memo,Fragment} from 'react'

//react-bootstrap
import { Offcanvas, Row, Col, Tooltip, OverlayTrigger, Button } from 'react-bootstrap'

// Redux Selector / Action
import { useSelector, useDispatch } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'
import { reset_state } from '../../store/setting/actions'

// Section Components
// Style Setting Section Components
import ThemeScheme from './sections/theme-scheme'
import ColorCustomizer from './sections/color-customizer'
import MenuColor from './sections/menu-color'
import MenuStyle from './sections/menu-style'
import MenuActiveStyle from './sections/menu-active-style'
import NavbarStyle from './sections/navbar-style'
import CardStyle from './sections/card-style'
import FooterStyle from './sections/footer-style'
import BannerStyle from './sections/banner-style'
import MenuHide from './sections/menu-hide'
import NavbarHide from './sections/navbar-hide';

// Advance Pro Setting Section Components
import AdProAppName from './sections/adpro-app-name'
import AdProFont from './sections/adpro-font'
import AdProPageStyle from './sections/adpro-page-style'
import AdProStyleAppearance from './sections/adpro-style-appearance'
import AdProStorage from './sections/adpro-storage'
import AdproAnimation from './sections/adpro-animation'

import {copyToClipboard} from '../../utilities/dom'

const SettingOffCanvas = memo((props) => {

    const [show, setShow] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipText, setTooltipText] = useState('Copy')

    const dispatch = useDispatch()

    // Define selectors
    const appName = useSelector(SettingSelector.app_name)
    const themeScheme = useSelector(SettingSelector.theme_scheme)
    const themeSchemeDirection = useSelector(SettingSelector.theme_scheme_direction)
    const themeColor = useSelector(SettingSelector.theme_color)
    const themeStyleAppearance = useSelector(SettingSelector.theme_style_appearance)
    const pageLayout = useSelector(SettingSelector.page_layout)
    const headerNavbar = useSelector(SettingSelector.header_navbar)
    const cardStyle = useSelector(SettingSelector.card_style)
    const headerBanner = useSelector(SettingSelector.header_banner)
    const sidebarColor = useSelector(SettingSelector.sidebar_color)
    const sidebarType = useSelector(SettingSelector.sidebar_type)
    const sidebarHide = useSelector(SettingSelector.sidebar_show)
    const navbarHide = useSelector(SettingSelector.navbar_show)
    const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style)
    const footer = useSelector(SettingSelector.footer)
    const bodyFontFamily = useSelector(SettingSelector.body_font_family)
    const headingFontFamily = useSelector(SettingSelector.heading_font_family)
    const saveLocal = useSelector(SettingSelector.saveLocal)
    const animation = useSelector(SettingSelector.theme_transition)

    const resetTheme = (e) => {
        dispatch(reset_state())
    }
    const settingObj =  useSelector(SettingSelector.settingObj)

    const copyConfig = (e) => {
        copyToClipboard(settingObj)
        setTooltipText('Copied!')
    }

    useEffect(() => {
        const onClick = (e) => {
            if(show) {
                if(e.target.closest('.live-customizer') == null && e.target.closest('#settingbutton') == null) {
                    setShow(false)
                }
            }
        };
        document.body.addEventListener("click", onClick);
    
        return () => {
            document.body.removeEventListener("click", onClick);
        };
    })
    return (
        <Fragment>
            <div className="btn btn-fixed-end btn-warning btn-icon btn-setting" onClick={(e) => {e.stopPropagation();setShow(true)}} >
                <svg width="24" viewBox="0 0 24 24" className="animated-rotate" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.8064 7.62361L20.184 6.54352C19.6574 5.6296 18.4905 5.31432 17.5753 5.83872V5.83872C17.1397 6.09534 16.6198 6.16815 16.1305 6.04109C15.6411 5.91402 15.2224 5.59752 14.9666 5.16137C14.8021 4.88415 14.7137 4.56839 14.7103 4.24604V4.24604C14.7251 3.72922 14.5302 3.2284 14.1698 2.85767C13.8094 2.48694 13.3143 2.27786 12.7973 2.27808H11.5433C11.0367 2.27807 10.5511 2.47991 10.1938 2.83895C9.83644 3.19798 9.63693 3.68459 9.63937 4.19112V4.19112C9.62435 5.23693 8.77224 6.07681 7.72632 6.0767C7.40397 6.07336 7.08821 5.98494 6.81099 5.82041V5.82041C5.89582 5.29601 4.72887 5.61129 4.20229 6.52522L3.5341 7.62361C3.00817 8.53639 3.31916 9.70261 4.22975 10.2323V10.2323C4.82166 10.574 5.18629 11.2056 5.18629 11.8891C5.18629 12.5725 4.82166 13.2041 4.22975 13.5458V13.5458C3.32031 14.0719 3.00898 15.2353 3.5341 16.1454V16.1454L4.16568 17.2346C4.4124 17.6798 4.82636 18.0083 5.31595 18.1474C5.80554 18.2866 6.3304 18.2249 6.77438 17.976V17.976C7.21084 17.7213 7.73094 17.6516 8.2191 17.7822C8.70725 17.9128 9.12299 18.233 9.37392 18.6717C9.53845 18.9489 9.62686 19.2646 9.63021 19.587V19.587C9.63021 20.6435 10.4867 21.5 11.5433 21.5H12.7973C13.8502 21.5001 14.7053 20.6491 14.7103 19.5962V19.5962C14.7079 19.088 14.9086 18.6 15.2679 18.2407C15.6272 17.8814 16.1152 17.6807 16.6233 17.6831C16.9449 17.6917 17.2594 17.7798 17.5387 17.9394V17.9394C18.4515 18.4653 19.6177 18.1544 20.1474 17.2438V17.2438L20.8064 16.1454C21.0615 15.7075 21.1315 15.186 21.001 14.6964C20.8704 14.2067 20.55 13.7894 20.1108 13.5367V13.5367C19.6715 13.284 19.3511 12.8666 19.2206 12.3769C19.09 11.8873 19.16 11.3658 19.4151 10.928C19.581 10.6383 19.8211 10.3982 20.1108 10.2323V10.2323C21.0159 9.70289 21.3262 8.54349 20.8064 7.63277V7.63277V7.62361Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <circle cx="12.1747" cy="11.8891" r="2.63616" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                </svg>
            </div>

            <Offcanvas show={show} onHide={() => setShow(false)} placement={`${themeSchemeDirection === "rtl" ? 'start' : 'end'}`} backdrop={false} scroll={true} className="live-customizer">
                <Offcanvas.Header closeButton>
                    <div className="d-flex align-items-center">
                        <h4 className="offcanvas-title" id="live-customizer-label">Live Customizer</h4>
                    </div>
                    <div className="d-flex gap-2">
                        <OverlayTrigger show={showTooltip} placement="left" overlay={
                            <Tooltip >{tooltipText}</Tooltip>
                        }>
                            <Button onClick={copyConfig} onMouseEnter={(e) => {e.stopPropagation();setShowTooltip(true)}} onMouseLeave={(e) => {e.stopPropagation();setShowTooltip(false); setTooltipText('Copy')}} variant="primary" >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M18.8088 9.021C18.3573 9.021 17.7592 9.011 17.0146 9.011C15.1987 9.011 13.7055 7.508 13.7055 5.675V2.459C13.7055 2.206 13.5026 2 13.253 2H7.96363C5.49517 2 3.5 4.026 3.5 6.509V17.284C3.5 19.889 5.59022 22 8.16958 22H16.0453C18.5058 22 20.5 19.987 20.5 17.502V9.471C20.5 9.217 20.298 9.012 20.0465 9.013C19.6247 9.016 19.1168 9.021 18.8088 9.021Z" fill="currentColor"></path>
                                    <path opacity="0.4" d="M16.0842 2.56737C15.7852 2.25637 15.2632 2.47037 15.2632 2.90137V5.53837C15.2632 6.64437 16.1742 7.55437 17.2792 7.55437C17.9772 7.56237 18.9452 7.56437 19.7672 7.56237C20.1882 7.56137 20.4022 7.05837 20.1102 6.75437C19.0552 5.65737 17.1662 3.69137 16.0842 2.56737Z" fill="currentColor"></path>
                                    <path d="M14.3672 12.2364H12.6392V10.5094C12.6392 10.0984 12.3062 9.7644 11.8952 9.7644C11.4842 9.7644 11.1502 10.0984 11.1502 10.5094V12.2364H9.4232C9.0122 12.2364 8.6792 12.5704 8.6792 12.9814C8.6792 13.3924 9.0122 13.7264 9.4232 13.7264H11.1502V15.4524C11.1502 15.8634 11.4842 16.1974 11.8952 16.1974C12.3062 16.1974 12.6392 15.8634 12.6392 15.4524V13.7264H14.3672C14.7782 13.7264 15.1122 13.3924 15.1122 12.9814C15.1122 12.5704 14.7782 12.2364 14.3672 12.2364Z" fill="currentColor"></path>
                                </svg>
                                Copy Config
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="left" overlay={
                            <Tooltip >Reset All Retting</Tooltip>
                        }>
                            <Button variant="primary btn-icon" onClick={resetTheme} data-reset="settings" data-bs-toggle="tooltip" data-bs-placement="left" title="" >
                                <div className="btn-inner">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.4">
                                            <path d="M4.88076 14.6713C4.74978 14.2784 4.32504 14.066 3.93208 14.197C3.53912 14.328 3.32675 14.7527 3.45774 15.1457L4.88076 14.6713ZM20.8808 15.1457C21.0117 14.7527 20.7994 14.328 20.4064 14.197C20.0135 14.066 19.5887 14.2784 19.4577 14.6713L20.8808 15.1457ZM4.16925 14.9085C3.45774 15.1457 3.45785 15.146 3.45797 15.1464C3.45802 15.1465 3.45815 15.1469 3.45825 15.1472C3.45845 15.1478 3.45868 15.1485 3.45895 15.1493C3.45948 15.1509 3.46013 15.1528 3.46092 15.1551C3.46249 15.1597 3.46456 15.1657 3.46716 15.1731C3.47235 15.188 3.47961 15.2084 3.48902 15.2341C3.50782 15.2854 3.53521 15.3576 3.5717 15.4477C3.64461 15.6279 3.7542 15.8805 3.90468 16.1814C4.2048 16.7817 4.67223 17.5836 5.34308 18.3886C6.68942 20.0043 8.88343 21.6585 12.1693 21.6585V20.1585C9.45507 20.1585 7.64908 18.8128 6.49542 17.4284C5.91627 16.7334 5.5087 16.0354 5.24632 15.5106C5.11555 15.2491 5.02201 15.0329 4.96212 14.8849C4.9322 14.811 4.91076 14.7543 4.89733 14.7177C4.89062 14.6994 4.88593 14.6861 4.88318 14.6783C4.88181 14.6744 4.88093 14.6718 4.88053 14.6706C4.88033 14.67 4.88025 14.6698 4.88029 14.6699C4.88031 14.67 4.88036 14.6701 4.88044 14.6704C4.88047 14.6705 4.88056 14.6707 4.88058 14.6708C4.88067 14.671 4.88076 14.6713 4.16925 14.9085ZM12.1693 21.6585C15.4551 21.6585 17.6491 20.0043 18.9954 18.3886C19.6663 17.5836 20.1337 16.7817 20.4338 16.1814C20.5843 15.8805 20.6939 15.6279 20.7668 15.4477C20.8033 15.3576 20.8307 15.2854 20.8495 15.2341C20.8589 15.2084 20.8662 15.188 20.8713 15.1731C20.8739 15.1657 20.876 15.1597 20.8776 15.1551C20.8784 15.1528 20.879 15.1509 20.8796 15.1493C20.8798 15.1485 20.8801 15.1478 20.8803 15.1472C20.8804 15.1469 20.8805 15.1465 20.8805 15.1464C20.8807 15.146 20.8808 15.1457 20.1693 14.9085C19.4577 14.6713 19.4578 14.671 19.4579 14.6708C19.4579 14.6707 19.458 14.6705 19.4581 14.6704C19.4581 14.6701 19.4582 14.67 19.4582 14.6699C19.4583 14.6698 19.4582 14.67 19.458 14.6706C19.4576 14.6718 19.4567 14.6744 19.4553 14.6783C19.4526 14.6861 19.4479 14.6994 19.4412 14.7177C19.4277 14.7543 19.4063 14.811 19.3764 14.8849C19.3165 15.0329 19.223 15.2491 19.0922 15.5106C18.8298 16.0354 18.4222 16.7334 17.8431 17.4284C16.6894 18.8128 14.8834 20.1585 12.1693 20.1585V21.6585Z" fill="currentColor"></path>
                                            <path d="M21.5183 19.2271C21.4293 19.2234 21.3427 19.196 21.2671 19.1465L16.3546 15.8924C16.2197 15.8026 16.1413 15.6537 16.148 15.4969C16.1546 15.34 16.2452 15.1982 16.3873 15.1202L21.5571 12.2926C21.7075 12.2106 21.8932 12.213 22.0416 12.3003C22.1907 12.387 22.2783 12.5436 22.2712 12.7096L22.014 18.7913C22.007 18.9573 21.9065 19.1059 21.7506 19.1797C21.6772 19.215 21.597 19.2305 21.5183 19.2271" fill="currentColor"></path>
                                        </g>
                                        <path d="M20.0742 10.0265C20.1886 10.4246 20.6041 10.6546 21.0022 10.5401C21.4003 10.4257 21.6302 10.0102 21.5158 9.61214L20.0742 10.0265ZM4.10803 8.88317C3.96071 9.27031 4.15513 9.70356 4.54226 9.85087C4.92939 9.99818 5.36265 9.80377 5.50996 9.41664L4.10803 8.88317ZM20.795 9.81934C21.5158 9.61214 21.5157 9.6118 21.5156 9.61144C21.5155 9.61129 21.5154 9.6109 21.5153 9.61059C21.5152 9.60998 21.515 9.60928 21.5147 9.60848C21.5143 9.60689 21.5137 9.60493 21.513 9.6026C21.5116 9.59795 21.5098 9.59184 21.5075 9.58431C21.503 9.56925 21.4966 9.54853 21.4882 9.52251C21.4716 9.47048 21.4473 9.39719 21.4146 9.3056C21.3493 9.12256 21.2503 8.8656 21.1126 8.55861C20.8378 7.94634 20.4044 7.12552 19.7678 6.29313C18.4902 4.62261 16.3673 2.87801 13.0844 2.74053L13.0216 4.23922C15.7334 4.35278 17.4816 5.77291 18.5763 7.20436C19.1258 7.92295 19.5038 8.63743 19.744 9.17271C19.8638 9.43949 19.9482 9.65937 20.0018 9.80972C20.0286 9.88483 20.0477 9.94238 20.0596 9.97951C20.0655 9.99808 20.0696 10.0115 20.072 10.0195C20.0732 10.0235 20.074 10.0261 20.0744 10.0273C20.0746 10.0278 20.0746 10.0281 20.0746 10.028C20.0746 10.0279 20.0745 10.0278 20.0745 10.0275C20.0744 10.0274 20.0744 10.0272 20.0743 10.0271C20.0743 10.0268 20.0742 10.0265 20.795 9.81934ZM13.0844 2.74053C9.80146 2.60306 7.54016 4.16407 6.12741 5.72193C5.42345 6.49818 4.92288 7.27989 4.59791 7.86704C4.43497 8.16144 4.31491 8.40923 4.23452 8.58617C4.1943 8.67471 4.16391 8.7457 4.14298 8.79616C4.13251 8.82139 4.1244 8.84151 4.11859 8.85613C4.11568 8.86344 4.11336 8.86938 4.1116 8.8739C4.11072 8.87616 4.10998 8.87807 4.10939 8.87962C4.10909 8.88039 4.10883 8.88108 4.1086 8.88167C4.10849 8.88196 4.10834 8.88234 4.10829 8.88249C4.10815 8.88284 4.10803 8.88317 4.80899 9.14991C5.50996 9.41664 5.50985 9.41692 5.50975 9.41719C5.50973 9.41725 5.50964 9.41749 5.50959 9.4176C5.5095 9.41784 5.50945 9.41798 5.50942 9.41804C5.50938 9.41816 5.50947 9.41792 5.50969 9.41734C5.51014 9.41619 5.51113 9.41365 5.51267 9.40979C5.51574 9.40206 5.52099 9.38901 5.52846 9.37101C5.5434 9.335 5.56719 9.27924 5.60018 9.20664C5.66621 9.0613 5.76871 8.84925 5.91031 8.59341C6.19442 8.08008 6.63084 7.39971 7.23855 6.72958C8.44912 5.39466 10.3098 4.12566 13.0216 4.23922L13.0844 2.74053Z" fill="currentColor"></path>
                                        <path d="M8.78337 9.33604C8.72981 9.40713 8.65805 9.46292 8.57443 9.49703L3.1072 11.6951C2.95672 11.7552 2.78966 11.7352 2.66427 11.6407C2.53887 11.5462 2.47359 11.3912 2.48993 11.2299L3.09576 5.36863C3.11367 5.19823 3.22102 5.04666 3.37711 4.97402C3.5331 4.9005 3.71173 4.91728 3.84442 5.01726L8.70581 8.68052C8.8385 8.78051 8.90387 8.94759 8.8762 9.1178C8.86358 9.19825 8.83082 9.27308 8.78337 9.33604" fill="currentColor"></path>
                                    </svg>
                                </div>
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col lg={12}>
                            <div className="border border-2 rounded mb-3">
                                <div className="px-3 pt-3 text-center">
                                    <h5 className="d-inline-block">Style Setting</h5>
                                </div>
                                <div className="p-3">
                                    <ThemeScheme themeScheme={themeScheme} themeSchemeDirection={themeSchemeDirection}></ThemeScheme>
                                    <hr className="hr-horizontal" />
                                    <ColorCustomizer themeColor={themeColor}></ColorCustomizer>
                                    {props.name === true ? '' : 
                                    <Fragment>
                                        <hr className="hr-horizontal" />
                                        <MenuHide sidebarHide={sidebarHide}></MenuHide> 
                                        <hr className="hr-horizontal" />
                                        <MenuColor sidebarColor={sidebarColor}></MenuColor>
                                        <hr className="hr-horizontal" />
                                        <MenuStyle sidebarType={sidebarType}></MenuStyle>
                                        <hr className="hr-horizontal" />
                                        <MenuActiveStyle sidebarMenuStyle={sidebarMenuStyle}></MenuActiveStyle>
                                        <hr className="hr-horizontal" />
                                        <NavbarHide navbarHide={navbarHide}></NavbarHide>
                                        <hr className="hr-horizontal" />
                                        <NavbarStyle headerNavbar={headerNavbar}></NavbarStyle>
                                        <CardStyle cardStyle={cardStyle}></CardStyle>
                                        <hr className="hr-horizontal" />
                                        <FooterStyle  footerstyle={footer} ></FooterStyle>
                                        {props.BannerStyle === true ? 
                                        <Fragment>
                                            <hr className="hr-horizontal" />
                                            <BannerStyle headerBanner={headerBanner}></BannerStyle>
                                        </Fragment>
                                        :''
                                        
                                        }
                                    </Fragment>
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="border border-2 rounded">
                                <div className="px-3 pt-3 text-center">
                                    <h5 className="d-inline-block">Advanced</h5>
                                    <span className="badge rounded-pill bg-warning">Pro</span>
                                </div>
                                <div className="p-3">
                                    <AdProAppName appName={appName}></AdProAppName>
                                    <AdProFont bodyFontFamily={bodyFontFamily} headingFontFamily={headingFontFamily}></AdProFont>
                                    <AdProPageStyle pageLayout={pageLayout}></AdProPageStyle>
                                    <AdProStyleAppearance themeStyleAppearance={themeStyleAppearance}></AdProStyleAppearance>
                                    <AdproAnimation animation={animation}></AdproAnimation>
                                    <AdProStorage saveLocal={saveLocal}></AdProStorage>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    )
})

SettingOffCanvas.displayName = 'SettingOffCanvas'
export default SettingOffCanvas
