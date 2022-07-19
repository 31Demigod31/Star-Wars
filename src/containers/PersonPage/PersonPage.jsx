import PropTypes from "prop-types";
import React, { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";

import PersonInfo from "@components/PersonPage/PersonInfo";
import PersonPhoto from "@components/PersonPage/PersonPhoto";
import PersonLinkBack from "@components/PersonPage/PersonLinkBack";

import UiLoading from "@ui/UiLoading";

import { withErrorApi } from "@hoc-helpers/withErrorApi";
import { getApiResource } from "@utils/network";
import { getPeopleImage } from "@services/getPeopleData";
import { API_PERSON } from "@constants/api";

import styles from "./PersonPage.module.css";

const PersonFilms = React.lazy(() => import('@components/PersonPage/PersonFilms'));

const PersonPage = ({ match, setErrorApi }) => {
  const [personId, setPersonId] = useState(null);
  const [personInfo, setPersonInfo] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personPhoto, setPersonPhoto] = useState(null);
  const [personFilms, setPersonFilms] = useState(null);
  const [personFavorite, setPersonFavorite] = useState(false);

  const storeData = useSelector(state => state.favoriteReducer);


  useEffect(() => {
    (async () => {
      const id = match.params.id;
      const res = await getApiResource(`${API_PERSON}/${id}/`);

      storeData[id] ? setPersonFavorite(true) : setPersonFavorite(false);

      setPersonId(id);

      if (res) {
        setPersonInfo([
          { title: "Height", data: res.height },
          { title: "Gender", data: res.gender },
          { title: "Hair Color", data: res.hair_color },
          { title: "Mass", data: res.mass },
          { title: "Skin Color", data: res.skin_color },
          { title: "Eye Color", data: res.eye_color },
          { title: "Birth Year", data: res.birth_year },
        ]);

        setPersonName(res.name);
        setPersonPhoto(getPeopleImage(id));

        res.films.length && setPersonFilms(res.films);

        setErrorApi(false);
      } else {
        setErrorApi(true);
      }
    })();
  }, []);

  return (
    <>
          <PersonLinkBack />

      <div className={styles.wrapper}>
        <span className={styles.person__name}>{personName}</span>
        <div className={styles.container}>
          <PersonPhoto 
          personId={personId} 
          personPhoto={personPhoto} 
          personName={personName}
          personFavorite={personFavorite}
          setPersonFavorite={setPersonFavorite} />
          {personInfo && <PersonInfo personInfo={personInfo} />}

          {personFilms && (
            <Suspense fallback={<UiLoading />}>
                  <PersonFilms personFilms={personFilms} />
            </Suspense>
          )}

        </div>
      </div>
    </>
  );
};

PersonPage.propTypes = {
  match: PropTypes.object,
  setErrorApi: PropTypes.func,
};

export default withErrorApi(PersonPage);
