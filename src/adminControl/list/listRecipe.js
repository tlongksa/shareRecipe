import React from 'react';
import './index.css';

const ListRecipe = () => {
    return (
        <>
            <div style={{ padding: '20px' }}>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th className="table-th"> Stt</th>
                            <th className="table-th"> Công thức</th>
                            <th className="table-th"> Mô tả</th>
                            <th className="table-th"> Ngày tạo</th>
                            <th className="table-th"> Tạo bởi</th>
                            <th className="table-th" style={{ float: 'right', marginRight: '72px' }}>
                                {' '}
                                Action
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    );
};

export default ListRecipe;
