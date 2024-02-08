import "./VehicleEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useVehicle} from "../../hooks/vehicles/useVehicle";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const VehicleEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        vehicle,
        fetchVehicle,
        setName,
        setDescription,
        setCategory,
        setPrice,
        setImage
    } = useVehicle()

    useEffect(() => {
        id && fetchVehicle(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveVehicle = async() => {
        let form_data = new FormData()

        form_data.append('name', vehicle.name)
        form_data.append('description', vehicle.description)
        form_data.append('category', vehicle.category)
        form_data.append('price', vehicle.price)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`components/${vehicle.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/vehicles/")
        }
    }

    const deleteVehicle = async () => {

        const response = await api.delete(`components/${vehicle.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/vehicles/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (vehicle == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={vehicle.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={vehicle.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={vehicle.description} setValue={setDescription} />

                    <CustomInput placeholder="Категория" value={vehicle.category} setValue={setCategory} />
                    
                    <CustomInput placeholder="Стоимость" value={vehicle.price} setValue={setPrice} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveVehicle}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteVehicle}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default VehicleEditPage