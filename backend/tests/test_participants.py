def test_participants_require_auth(client):
    response = client.get("/participants")
    assert response.status_code == 401


def test_create_participant(client, auth_headers, participant_payload):
    response = client.post("/participants", json=participant_payload, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["subject_id"] == "P001"
    assert data["study_group"] == "treatment"
    assert data["participant_id"]


def test_list_participants(client, auth_headers, participant_payload):
    client.post("/participants", json=participant_payload, headers=auth_headers)
    response = client.get("/participants", headers=auth_headers)
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_participant_not_found(client, auth_headers):
    response = client.get(
        "/participants/00000000-0000-0000-0000-000000000000",
        headers=auth_headers,
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Participant not found"


def test_create_participant_validation_error(client, auth_headers):
    response = client.post(
        "/participants",
        json={"subject_id": "P002", "study_group": "invalid"},
        headers=auth_headers,
    )
    assert response.status_code == 422


def test_create_participant_duplicate_subject_id(client, auth_headers, participant_payload):
    client.post("/participants", json=participant_payload, headers=auth_headers)
    response = client.post("/participants", json=participant_payload, headers=auth_headers)
    assert response.status_code == 409
    assert response.json()["detail"] == "Subject ID already exists"
