import { useState } from 'react'
import './App.css'

function App() {
 const [files, setFiles] = useState([]);
    const [renamedFiles, setRenamedFiles] = useState([]);

    const parseXmlToDict = (xmlContent) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

        const getTextContent = (path) => {
            const element = xmlDoc.querySelector(path);
            return element ? element.textContent : '';
        };

        const baseData = {
            OrderType: getTextContent('OrderType'),
            PONumber: getTextContent('PONumber'),
            PODate: getTextContent('PODate').replace(/-/g, ''),
            SoldtoParty_Code: getTextContent('SoldtoParty > Code'),
            SoldtoParty_Name1: getTextContent('SoldtoParty > Name1'),
            SoldtoParty_Name2: getTextContent('SoldtoParty > Name2'),
            SoldtoParty_Address1: getTextContent('SoldtoParty > Address1').substring(0, 10),
            SoldtoParty_Address2: getTextContent('SoldtoParty > Address2').substring(0, 10),
            SoldtoParty_Address3: getTextContent('SoldtoParty > Address3').substring(0, 10),
            SoldtoParty_PostCode: getTextContent('SoldtoParty > PostCode').substring(0, 5),
            SoldtoParty_Email: getTextContent('SoldtoParty > Email').substring(0, 10),
            ShiptoParty_Code: getTextContent('ShiptoParty > Code'),
            ShiptoParty_Name1: getTextContent('ShiptoParty > Name1').substring(0, 10),
            ShiptoParty_Name2: getTextContent('ShiptoParty > Name2'),
            ShiptoParty_Address1: getTextContent('ShiptoParty > Address1').substring(0, 10),
            ShiptoParty_Address2: getTextContent('ShiptoParty > Address2').substring(0, 10),
            ShiptoParty_Address3: getTextContent('ShiptoParty > Address3').substring(0, 10),
            ShiptoParty_PostCode: getTextContent('ShiptoParty > PostCode').substring(0, 5),
            Remarks: getTextContent('Remarks'),
            OrderId: getTextContent('OrderId'),
            RequestDeliveryDate: getTextContent('RequestDeliveryDate') ? new Date(getTextContent('RequestDeliveryDate')).toLocaleDateString('en-US') : '',
        };

        const orderItems = Array.from(xmlDoc.querySelectorAll('OrderItems > OrderItem')).map(item => ({
            OrderItems_ItemRefCode5: getTextContent('ItemRefCode5'),
            OrderItems_LineNumber: getTextContent('LineNumber'),
            OrderItems_SKU: getTextContent('SKU'),
            OrderItems_ItemRefCode3: getTextContent('ItemRefCode3'),
            OrderItems_OrderQuantity: getTextContent('OrderQuantity'),
            OrderItems_ItemPrice: getTextContent('ItemPrice'),
            OrderItems_CurrencyCode: getTextContent('CurrencyCode'),
        }));

        return orderItems.map(orderItem => ({ ...baseData, ...orderItem }));
    };

    const saveToTxt = (dataList, delimiter = ';') => {
        const headers = [
            "SALESORG", "DISTCHAN", "DIVISION", "ORDRTYPE", "RFORDFLG", "RFBILFLG", "RFQUOFLG", 
            "RFTENFLG", "RFITMFLG", "RFATMFLG", "PONUMBER", "PODATE", "TENDERNO", "RFTENDER", 
            "DELCOMPL", "ORDSORCE", "SOLDTOCD", "SLDTONA1", "SLDTONA2", "SLDTOST1", "SLDTOST2", 
            "SLDTOST3", "SLDTOST4", "SLDTOPOS", "SLDTOCON", "SLDTOEML", "SHIPTOCD", "SHPTONA1", 
            "SHPTONA2", "SHPTOST1", "SHPTOST2", "SHPTOST3", "SHPTOST4", "SHPTOPOS", "SHPTODIS", 
            "SHPTOCTY", "SHPTOCON", "BILLTOCD", "BILTONA1", "BILTONA2", "BILTOST1", "BILTOST2", 
            "BILTOST3", "BILTOST4", "BILTOPOS", "PAYERCD", "PAYERNA1", "PAYERNA2", "PAYERST1", 
            "PAYERST2", "PAYERST3", "PAYERST4", "BILTOPOS", "SHIPCOND", "HDRDELBL", "HDRBILBL", 
            "TAXCLASS", "ORDREASN", "USAGECDE", "SPINSTC1", "SPINSTC2", "SPINSTC3", "SHINSTC1", 
            "SHINSTC2", "SHINSTC3", "REFNOTE1", "REFNOTE2", "REFNOTE3", "IVREFNO", "SRNAME", 
            "REFPRNOR", "SHPYREF", "PAYTERMS", "REQDELIV", "PROJECTNO", "ITMLINNO", "SAPMATCD", 
            "SAPMATNA", "PRNMATNA", "CUSTMATN", "REFCOMLN", "BONUSFLG", "SAPBATCH", "BATCHNO", 
            "BATCHEXP", "SERIALNO", "STORALOC", "PLANT", "PRNCODE", "PRNNAME", "TRANSGRP", 
            "ITMDELBL", "PPAAPROV", "BOREASON", "BOSTATUS", "ORDERQTY", "UOM", "OVRPRICE", 
            "TRDDISC1", "TRDDISC2", "RBTDISC1", "RBTDISC2", "CURRENCY"
        ];

        const rows = dataList.map(data => [
            "", "", "", 
            data.OrderType, 
            "", "", "", "", "", "", 
            data.PONumber, 
            data.PODate, 
            "", "","", "", 
            data.SoldtoParty_Code, 
            data.SoldtoParty_Name1,
            data.SoldtoParty_Name2,
            data.SoldtoParty_Address1, 
            data.SoldtoParty_Address2,
            data.SoldtoParty_Address3,
            "",
            data.SoldtoParty_PostCode,
            "", 
            data.SoldtoParty_Email,
            data.ShiptoParty_Code, 
            data.ShiptoParty_Name1, 
            data.ShiptoParty_Name2, 
            data.ShiptoParty_Address1, 
            data.ShiptoParty_Address2, 
            data.ShiptoParty_Address3, 
            "",
            data.ShiptoParty_PostCode, 
            "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", 
            "ZFD",
            "", "", "", "", "",
            data.Remarks, 
            "", "", "", "", "", "", "",
            data.OrderItems_ItemRefCode5, 
            "", "",
            data.OrderId, 
            "", "",
            data.RequestDeliveryDate, 
            "",
            data.OrderItems_LineNumber, 
            "", "", "",
            data.OrderItems_SKU, 
            "",
            data.OrderItems_ItemRefCode3, 
            "", "", "", "", "", "",
            "102126",
            "", "", "", "", "", "",
            data.OrderItems_OrderQuantity,
            "",
            data.OrderItems_ItemPrice,
            "", "", "", "", 
            data.OrderItems_CurrencyCode
        ]);

        const content = [headers.join(delimiter), ...rows.map(row => row.join(delimiter))].join('\n');
        return content;
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files).filter(file => file.type === 'text/xml');
        setFiles(selectedFiles);

        const renamed = selectedFiles.map(file => {
            const newName = file.name.replace('.XML', '.txt');
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    const parsedData = parseXmlToDict(content);
                    const txtContent = saveToTxt(parsedData);
                    const newFile = new File([txtContent], newName, { type: 'text/plain' });
                    resolve(newFile);
                };
                reader.onerror = (e) => reject(e);
                reader.readAsText(file);
            });
        });

        Promise.all(renamed).then(setRenamedFiles);
    };

    const handleDownload = (file) => {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h1>Upload XML Files</h1>
            <input
                type="file"
                accept=".xml"
                multiple
                onChange={handleFileChange}
            />
            <div>
                <h2>Selected Files</h2>
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>
                            {file.name}
                            <button onClick={() => handleDownload(renamedFiles[index])}>
                                Download Renamed File
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App
