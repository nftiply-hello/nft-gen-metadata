

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import * as yup from "yup";
import { Formik, } from 'formik';
import axios from 'axios';

const schema = yup.object().shape({
  assetFile: yup.mixed().required(),
  configFile: yup.mixed().required(),
  avaNum: yup.number().required(),
  baseName: yup.string().required(),
  collDescription: yup.string().required(),
  email: yup.string().email().required(),
});

const submitForm = async (values, { setSubmitting, resetForm, setFieldValue }) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const formData = new FormData()
  formData.append('zipFile', values.assetFile)
  formData.append('configFile', values.configFile)
  formData.append('avaNums', values.avaNum)
  formData.append('baseName', values.baseName)
  formData.append('collectionDescription', values.collDescription)
  formData.append('email', values.email)
  setSubmitting(true)
  await axios.post('https://pure-shelf-95376.herokuapp.com/save-file', formData, config)
  resetForm()
  setSubmitting(false)
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nft metadata generator</title>
        <meta name="description" content="Come and create your nft metadatas" />
        <meta property="og:title" content="Nft generator" />
        <meta property="og:description" content="Come and create your nft metadatas" />
        {/* <meta property="og:url" content="https://myclothingstore.com/" /> */}
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          THE BEST FREE NFT GENERATOR TOOL
        </h1>

        <p className={styles.description}>
          Generate massive numbers of NFT with determined rarity – and it’s FREE!
        </p>

        <Formik
          validationSchema={schema}
          onSubmit={(submitForm)}
          initialValues={{
            assetFile: null,
            configFile: null,
            avaNum: 20,
            baseName: '',
            collDescription: '',
            email: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values,
            touched,
            isValid,
            errors,
            isSubmitting
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik101"
                >
                  <Form.Label>Asset Zip File <a href='/assets.zip' download>Download sample file</a></Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="assetFile"
                    onChange={(event) => {
                      setFieldValue('assetFile', event.currentTarget.files[0])
                    }}
                    isInvalid={!!errors.assetFile}
                  />
                  <Form.Control.Feedback type="invalid" >
                    {errors.assetFile}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik102"
                >
                  <Form.Label>Config File <a href='/config.json' download>Download sample file</a></Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="configFile"
                    onChange={(event) => {
                      setFieldValue('configFile', event.currentTarget.files[0])
                    }}
                    isInvalid={!!errors.configFile}
                  />
                  <Form.Control.Feedback type="invalid" >
                    {errors.configFile}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik103"
                >
                  <Form.Label>Avatar amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Avatar"
                    name="avaNum"
                    value={values.avaNum}
                    onChange={handleChange}
                    isInvalid={!!errors.avaNum}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.avaNum}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik104"
                >
                  <Form.Label>Item base name</Form.Label>
                  <Form.Control
                    type="text"
                    name="baseName"
                    value={values.baseName}
                    onChange={handleChange}
                    isInvalid={!!errors.baseName}
                  />

                  <Form.Control.Feedback type="invalid">{errors.baseName}!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik105"
                >
                  <Form.Label>Collection description</Form.Label>
                  <Form.Control
                    type="text"
                    name="collDescription"
                    value={values.collDescription}
                    onChange={handleChange}
                    isInvalid={!!errors.collDescription}
                  />

                  <Form.Control.Feedback type="invalid">{errors.collDescription}!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik106"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Col md="4"></Col>
                <Col md="4">
                  <Button type="submit" disabled={isSubmitting}>START GENERATING YOUR NFT</Button>
                </Col>
                <Col md="4"></Col>
              </Row>
            </Form>
          )}
        </Formik>
        <br />
        <br />
        <br />
        <h2>
          What you need to set up:
        </h2>

        <span>
          <b>Asset Zip File:</b> Your NFT layers/traits with specific name for each layer/trait (in PNG format) <a href='/assets.zip' download>Download sample file</a>
        </span>
        <span>
          <b>Config File:</b> Appearance frequency for each layer/trait <a href='/config.json' download>Download sample file</a>
        </span>
        <span>
          <b>Avatar amount:</b> Expected number of NFT you want to generate
        </span>
        <span>
          <b>Item base name:</b> Example: Collective#
        </span>
        <span>
          <b>Collection description</b>
        </span>
        <span>
          <b>Email:</b> We will send the output.zip file to this receiver email
        </span>
        <br />
        <br />
        <br />
        <h2>
          What you will receive result in your email:
        </h2>

        <span>
          Your NFT images (.PNG) generated from your provided layers
        </span>
        <span>
          Your NFT metadata (.JSON)
        </span>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        {/* Got question? Contact us! (link to contact form) */}
      </footer>
    </div>
  )
}
