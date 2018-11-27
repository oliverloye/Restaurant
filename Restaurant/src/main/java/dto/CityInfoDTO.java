package dto;

import entity.CityInfo;

public class CityInfoDTO {

    public String zip;
    public String city;
    public String cityZip;

    public CityInfoDTO(CityInfo cityInfo) {
        this.zip = cityInfo.getZip();
        this.city = cityInfo.getCity();
        this.cityZip = cityInfo.getCity() + ", " + cityInfo.getZip();
    }

}
