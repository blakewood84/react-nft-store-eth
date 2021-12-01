import React from 'react'
import { Card, Button } from 'react-bootstrap';

const NFTCard = (props) => {

    const { token_id, metadata, name, token_address, contract_type } = props
    const { image, description, external_url } = JSON.parse(metadata) || {}

    const handleMouseEnter = () => {

        var filter = document.querySelector(`.filter-${token_id}`)
        filter.style.display = 'inline-flex'

        var block = document.querySelector(`.overlay-${token_id}`)
        block.style.display = 'block'
        block.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)'
    }

    const handleMouseLeave = () => {

        var filter = document.querySelector(`.filter-${token_id}`)
        filter.style.display = 'none'

        var block = document.querySelector(`.overlay-${token_id}`)
        block.style.display = 'none'
    }

    const handleOnClick = () => {

    }

    const handleProveOwnership = () => {

    }

    return (
        <Card 
            key={token_id + name.replace(/ /g, '')} 
            id={token_id + name.replace(/ /g, '')} 
            className="card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            onClick={handleOnClick}
        >
            {
                image ? ( 
                    <Card.Img variant="top" src={image} />
                    ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/640x360" style={{width: '256px', height: '256px'}} />
                )
            }
            <Card.Body>
                <Card.Title style={{overflow: 'hidden', textOverflow: 'ellipsis', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical', fontSize: '12px', display: '-webkit-box',}}><span style={{fontSize: '14px', fontWeight: 'bold'}}>Name: </span> {name}</Card.Title>
                <Card.Text style={{overflow: 'hidden', textOverflow: 'ellipsis', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical', fontSize: '12px', display: '-webkit-box',}}>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>Description: </span> {description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last Updated 3 min ago</small>
            </Card.Footer>
            <div className={`filter-${token_id}`} style={{
                backgroundColor: '#000', 
                opacity: '.5',
                display: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }}></div>
            <div className={`overlay-${token_id}`} style={{display: 'none'}}>
                <Button onClick={handleProveOwnership} style={{fontSize: '10px'}}>Prove Ownership</Button>
            </div>
        </Card>
    )
    
}

export default NFTCard