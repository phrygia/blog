import React from 'react'
import Phrygia from '../assets/img/phrygia.jpg'
import styled from 'styled-components'

const PhrygiaInfoBox = styled.div`
    margin-top:25px;
    dl {
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        font-family: 'Noto Sans KR', sans-serif;
        border-bottom: 1px solid #eee;
        dt {
            overflow: hidden;
            border-radius: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        dd {
            strong {
                color: #323232;
                letter-spacing: -1px;
            }
            p {
                word-break: break-all;
                color: #ababab;
                font-weight: 300;
            }
        }
    }
    @media ${(props) => props.theme.pc} {
        dl {
            dt {
                width: 110px;
                height: 110px;
            }
            dd {
                margin-left: 20px;
                width: -webkit-calc(100% - 110px);
                width: calc(100% - 110px);
                strong {
                    font-size: 1.3em;
                }
                p {
                    margin-top: 8px;
                    font-size: 0.9em;
                }
            }
        }
    }
    @media ${(props) => props.theme.mo} {
        dl {
            dt {
                width: 86px;
                height: 80px;
            }
            dd {
                margin-left: 15px;
                width: -webkit-calc(100% - 80px);
                width: calc(100% - 80px);
                strong {
                    font-size: 16.5px;
                }
                p {
                    margin-top: 5px;
                    font-size: 12px;
                }
            }
        }
    }
`

function AdminInfo() {
    return (
        <PhrygiaInfoBox>
            <dl>
                <dt>
                    <img src={Phrygia} alt="phrygia" />
                </dt>
                <dd>
                    <strong>Chaeyeon Lee</strong>
                    <p>Frontend Engineer 꿈꾸는 3년차 Publisher입니다-*</p>
                </dd>
            </dl>
        </PhrygiaInfoBox>
    )
}

export default AdminInfo
